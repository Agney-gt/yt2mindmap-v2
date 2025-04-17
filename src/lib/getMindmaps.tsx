import { BlobServiceClient } from '@azure/storage-blob';
import { getServerSession } from 'next-auth';
const connectionString = process.env.AZURE_STORAGE_CONNECTION_STRING || '';
const blobServiceClient = BlobServiceClient.fromConnectionString(connectionString);
// lib/getMindmaps.ts
export async function getUserMindmaps(email: string) {
    const containerName = 'html';
    const containerClient = blobServiceClient.getContainerClient(containerName);
    const userFolder = `user-${email.split("@")[0]}`;
    const mindmaps = [];
  
    for await (const blob of containerClient.listBlobsByHierarchy('/', { prefix: `${userFolder}/` })) {
      if (blob.kind === 'blob' && blob.name.endsWith('.html')) {
        const blobClient = containerClient.getBlockBlobClient(blob.name);
        const downloadResponse = await blobClient.download();
        const htmlContent = await streamToString(downloadResponse.readableStreamBody);
  
        const titleMatch = htmlContent.match(/<title[^>]*>\s*([^<]+?)\s*<\/title>/i);
        const title = titleMatch ? titleMatch[1] : 'Untitled';
        mindmaps.push({
          id: blob.name.split('/').pop()?.replace('.html', '') || '',
          title,
          createdAt: blob.properties.lastModified?.toISOString() || new Date().toISOString()
        });
      }
    }
  
    return mindmaps.sort((a, b) =>
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }
  
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
  
    const metadataResponse = await metadataBlobClient.download();
    const metadataContent = await streamToString(metadataResponse.readableStreamBody || null);
  
    const htmlResponse = await htmlBlobClient.download();
    const htmlContent = await streamToString(htmlResponse.readableStreamBody || null);
  
    return {
      metadata: JSON.parse(metadataContent),
      htmlContent,
    };
  }