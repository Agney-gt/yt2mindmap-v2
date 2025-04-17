import { NextResponse } from "next/server";
import { redis } from "@/lib/redis";
import { Ratelimit } from "@upstash/ratelimit";
const ratelimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(3, "1 m"),
  analytics: true,
});

interface WebhookData {
  event: string;
  taskId: string;
  data: Record<string, unknown>;
  email?: string;
}

interface TaskData {
  taskId: string;
  status: string;
  progress: number;
  email?: string;
  data: WebhookData;
  createdAt: string;
  updatedAt: string;
  isTranscribe: boolean;
}

export async function POST(request: Request): Promise<NextResponse> {
  try {
    const ip = request.headers.get("x-forwarded-for") ?? "anonymous";

    // Rate limit check
    const { success, limit, remaining, reset } = await ratelimit.limit(ip);
    if (!success) {
      return NextResponse.json(
        {
          success: false,
          message: "Rate limit exceeded. Please try again later.",
        },
        {
          status: 429,
          headers: {
            "X-RateLimit-Limit": limit.toString(),
            "X-RateLimit-Remaining": remaining.toString(),
            "X-RateLimit-Reset": reset.toString(),
          },
        }
      );
    }

    if (!request.headers.get("content-type")?.includes("application/json")) {
      return NextResponse.json(
        { success: false, message: "Invalid content type" },
        { status: 400 }
      );
    }

    let body: WebhookData;
    try {
      const rawBody = await request.text();
      body = JSON.parse(rawBody);
    } catch (err) {
      return NextResponse.json(
        { success: false, message: err },
        { status: 400 }
      );
    }

    if (!body.taskId || typeof body.taskId !== "string") {
      return NextResponse.json(
        { success: false, message: "taskId is required and must be a string" },
        { status: 400 }
      );
    }

    const taskId = body.taskId.trim();
    if (taskId.length < 8 || taskId.length > 32) {
      return NextResponse.json(
        {
          success: false,
          message: "taskId must be between 8 and 32 characters",
        },
        { status: 400 }
      );
    }

    const taskData: TaskData = {
      taskId,
      status: "pending",
      progress: 0,
      email: body.email,
      data: body,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      isTranscribe: true,
    };

    await redis.set(`task:${taskId}`, JSON.stringify(taskData));

    return NextResponse.json({
      success: true,
      message: "Task enqueued successfully",
      taskId,
    });
  } catch (error) {
    console.error("Webhook POST error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function GET(request: Request): Promise<NextResponse> {
  try {
    const { searchParams } = new URL(request.url);
    const taskId = searchParams.get("taskId");

    if (!taskId) {
      return NextResponse.json(
        { success: false, message: "Task ID is required" },
        { status: 400 }
      );
    }

    // Get task status from Redis
    const taskData = await redis.get(`task:${taskId}`);

    if (!taskData) {
      return NextResponse.json(
        { success: false, message: "Task not found" },
        { status: 404 }
      );
    }

    try {
      const parsedData = typeof taskData === 'string' ? JSON.parse(taskData) : taskData;
      return NextResponse.json({
        success: true,
        task: parsedData,
      });
    } catch (error) {
      return NextResponse.json(
        { success: false, message: error },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Error fetching task status:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch task status" },
      { status: 500 }
    );
  }
}