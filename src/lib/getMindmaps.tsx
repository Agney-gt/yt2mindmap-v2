import { BlobServiceClient } from '@azure/storage-blob';
import { getServerSession } from 'next-auth';
const connectionString = process.env.AZURE_STORAGE_CONNECTION_STRING || '';
const blobServiceClient = BlobServiceClient.fromConnectionString(connectionString);
function removeHeaders(text: string) {
  // List of headers to be removed (including a space after the colon)
  const headers = [
      "Quote: ", "Rhetoric: ", "Counterpoint: ", "Rhetoric: ","Real-world Example: ","Sociopolitical Factors: ",
      "Cultural Reference: ", "Sociopolitical Context: ", "Challenge: ", "Technology: ", "Limitation: ",
      "Misconception: ", "Framework: ", "Pitfall: ", "Analogy: ", 
      "Thought Leader: ", "Method: ", "Case Study: ","Anecdote: ",
      "Trend: ", "Nuanced Insight: ","Pattern: ", "Academic Theory: ",
      "Appeal to Logic: ","Complexity: ", "Paradox: ", "Event: ", "Contradiction: ",
      "Data Point: ", "Metaphor", "Technological Innovation: ", "Historical Context: ","Cultural Context: ",
      "Economic Insight: ", "Psychological Insight: ", "Philosophical Insight: ",
  ];
   // Create a regex pattern by joining all headers with '|'
   const pattern = new RegExp(headers.join("|"), "g");
  
   // Replace all headers with an empty string
   return text.replace(pattern, "");
 
 }
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
    const clean_html = removeHeaders(htmlContent)
  
    return {
      metadata: JSON.parse(metadataContent),
      clean_html,
    };
  }