import { NextResponse } from 'next/server';
import { BlobServiceClient } from '@azure/storage-blob';
import { getServerSession } from 'next-auth';

const connectionString = process.env.AZURE_STORAGE_CONNECTION_STRING || '';
const blobServiceClient = BlobServiceClient.fromConnectionString(connectionString);

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await getServerSession();
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { title, youtubeUrl, htmlContent } = await request.json();
    const resolvedParams = await params; // Await the Promise to get { id: string }
    const id = resolvedParams.id;

    if (!id) {
      return NextResponse.json({ error: 'Mindmap ID is required' }, { status: 400 });
    }

    const containerName = 'html';
    const containerClient = blobServiceClient.getContainerClient(containerName);
    const userEmail = session.user.email.toLowerCase();
    console.log(containerClient)
    // Update metadata
    const metadataBlobName = `user-${userEmail.split("@")[0]}/${id}.json`;
    const metadataBlobClient = containerClient.getBlockBlobClient(metadataBlobName);
    const metadata = {
      id,
      title,
      youtubeUrl,
      createdAt: new Date().toISOString(),
    };
    await metadataBlobClient.upload(
      JSON.stringify(metadata),
      JSON.stringify(metadata).length
    );

    // Update HTML content
    const htmlBlobName = `user-${userEmail.split("@")[0]}/${id}.html`;
    const htmlBlobClient = containerClient.getBlockBlobClient(htmlBlobName);
    await htmlBlobClient.upload(htmlContent, htmlContent.length);

    return NextResponse.json(metadata);
  } catch (error) {
    console.error('Error updating mindmap:', error);
    return NextResponse.json(
      { error: 'Failed to update mindmap' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await getServerSession();
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const resolvedParams = await params; // Await the Promise to get { id: string }
    const id = resolvedParams.id;
    
    if (!id) {
      return NextResponse.json({ error: 'Mindmap ID is required' }, { status: 400 });
    }

    const containerName = 'html';
    const containerClient = blobServiceClient.getContainerClient(containerName);
    const userEmail = session.user.email.toLowerCase();
    const userPrefix = `user-${userEmail.split("@")[0]}`;

    // Define blob names
    const metadataBlobName = `${userPrefix}/${id}.json`;
    const htmlBlobName = `${userPrefix}/${id}.html`;

    // Delete metadata blob
    const metadataBlobClient = containerClient.getBlockBlobClient(metadataBlobName);
    const metadataDeleteResult = await metadataBlobClient.deleteIfExists({ deleteSnapshots: 'include' });

    // Delete HTML blob
    const htmlBlobClient = containerClient.getBlockBlobClient(htmlBlobName);
    const htmlDeleteResult = await htmlBlobClient.deleteIfExists({ deleteSnapshots: 'include' });

    const deleted = metadataDeleteResult.succeeded || htmlDeleteResult.succeeded;

    if (!deleted) {
      return NextResponse.json({ error: 'Mindmap not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Mindmap deleted successfully' });
  } catch (error) {
    console.error('Error deleting mindmap:', error);
    return NextResponse.json(
      { error: 'Failed to delete mindmap' },
      { status: 500 }
    );
  }
}