// Import the Pinecone library
const { Pinecone } = require("@pinecone-database/pinecone");

// Initialize a Pinecone client with your API key
const pc = new Pinecone({ apiKey: process.env.PINE_CONE_API_KEY });

// Create an index for stores the vectors.

const chatGptIndex = pc.index("chat-gpt");

async function createMemory({ vectors, metadata, messageId }) {
  await chatGptIndex.upsert({
    records: [
      {
        id: messageId,
        values: vectors,
        metadata,
      },
    ],
  });
}

async function queryMemory({ queryVector, limit = 5, metadata }) {
  const data = await chatGptIndex.query({
    vector: queryVector,
    topK: limit,
    filter: metadata ?  metadata  : undefined,
    includeMetadata: true,
  });

  return data.matches;
}

module.exports = {
  createMemory,
  queryMemory,
};
