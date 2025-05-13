import { BlobServiceClient } from '@azure/storage-blob';
import { getServerSession } from 'next-auth';
const connectionString = process.env.AZURE_STORAGE_CONNECTION_STRING || '';
const blobServiceClient = BlobServiceClient.fromConnectionString(connectionString);
// lib/getMindmaps.ts

  async function streamToString(readableStream: NodeJS.ReadableStream | undefined | null): Promise<string> {
    if (!readableStream) {
      return '';
    }
  
    const chunks: Buffer[] = [];
    for await (const chunk of readableStream) {
      if (Buffer.isBuffer(chunk)) {
        chunks.push(chunk);
      } else {
        chunks.push(Buffer.from(chunk));
      }
    }
    return Buffer.concat(chunks).toString('utf-8');
  }

  export async function getMindmapById(id: string) {
    const session = await getServerSession();
    if (!session?.user?.email) throw new Error('Unauthorized');
  
    const userEmail = session.user.email.toLowerCase();
    const containerName = 'html';
    const containerClient = blobServiceClient.getContainerClient(containerName);
  
    const prefix = `user-${userEmail.split('@')[0]}/${id}`;
    const metadataBlobClient = containerClient.getBlockBlobClient(`${prefix}.json`);
    const htmlBlobClient = containerClient.getBlockBlobClient(`${prefix}.html`);
  
    const [metadataResponse, htmlResponse] = await Promise.all([
      metadataBlobClient.download(),
      htmlBlobClient.download(),
    ]);

    const [metadataContent, htmlContent] = await Promise.all([
      streamToString(metadataResponse.readableStreamBody || null),
      streamToString(htmlResponse.readableStreamBody || null),
    ]);
  
    return {
      metadata: JSON.parse(metadataContent),
      htmlContent,
    };
  }