const { BlobServiceClient } = require("@azure/storage-blob");
const { v1: uuidv1 } = require("uuid");
require("dotenv").config();
const { DefaultAzureCredential } = require('@azure/identity');

async function main() {
  try {
    console.log("Azure Blob storage v12 - JavaScript quickstart sample");

    // Quick start code goes here
    const accountName = "steve.nguyen@linksinternational.com";
    if (!accountName) throw Error('Azure Storage accountName not found');

    const blobServiceClient = new BlobServiceClient(
    `https://${accountName}.blob.core.windows.net`,
    new DefaultAzureCredential()
    );

    console.log('\nListing blobs...');
    const containerName = 'container2';
    const containerClient = blobServiceClient.getContainerClient(containerName);
    console.log('\nListing blobs...');
    
    // List the blob(s) in the container.
    for await (const blob of containerClient.listBlobsFlat()) {
        console.log('\nListing blobs...', blob);

        // Get Blob Client from name, to get the URL
        const tempBlockBlobClient = containerClient.getBlockBlobClient(blob.name);

        // Display blob name and URL
        console.log(
            `\n\tname: ${blob.name}\n\tURL: ${tempBlockBlobClient.url}\n`
        );
    }


  } catch (err) {
    console.log(`Error: ${err.message}`);
  }
}

main()
  .then(() => console.log("Done"))
  .catch((ex) => console.log(ex.message));