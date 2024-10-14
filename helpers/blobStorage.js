const { BlobServiceClient } = require("@azure/storage-blob");
const {ClientSecretCredential} = require("@azure/identity");
const { v1: uuidv1 } = require("uuid");
const fs = require("fs");
const continerName = 'prescriptionpdfs';

console.log(process.env.TENANT_ID);
console.log(process.env.CLIENT_ID);
console.log(process.env.CLIENT_SECRET);

async function streamToBuffer(readableStream) {
    return new Promise((resolve, reject) => {
        const chunks = [];
        readableStream.on('data', (data) => {
            chunks.push(data);
        });
        readableStream.on('end', () => {
            resolve(Buffer.concat(chunks));
        });
        readableStream.on('error', reject);
    });
}

async function main() {
  try {
    console.log("Azure Blob storage v12 - JavaScript quickstart sample");
    const creds = new ClientSecretCredential(process.env.TENANT_ID, process.env.CLIENT_ID, process.env.CLIENT_SECRET);

    const blobServiceClient = new BlobServiceClient(
        `https://${process.env.STORAGE_ACCOUNT_NAME}.blob.core.windows.net`,
        creds
        );

    const containerClient = blobServiceClient.getContainerClient(continerName);

    // const blobName = "quickstart" + uuidv1() + ".pdf";


    // // Create a blob
    // const blockBlobClient = containerClient.getBlockBlobClient(blobName);
    // // read file ./sample.pdf
    // const filePath = "./sample.pdf";
    // const fileBuffer = fs.readFileSync(filePath);
    // const fileSize = fileBuffer.byteLength;

    // await blockBlobClient.upload(fileBuffer, fileSize, {
    //     blobHTTPHeaders: {
    //         blobContentType: "application/pdf",
    //     },
    //     });
    // console.log(`Blob "${blobName}" is uploaded`);


    // List the blob(s) in the container.
    for await (const blob of containerClient.listBlobsFlat()) {
        console.log(`Blob: ${blob.name}`);
    }

    // DELETE

    // delete blob quickstart92e65df0-71a8-11ef-8473-bf91ccfca49a.txt

    //  const blobName = "quickstart92e65df0-71a8-11ef-8473-bf91ccfca49a.txt";

    // // Get a block blob client
    // const blockBlobClient = containerClient.getBlockBlobClient(blobName);

    // // Delete the blob

    // await blockBlobClient.delete();

  } catch (err) {
    console.log(`Error: ${err.message}`);
  }
}

async function listObjects () {
  try{

    const creds = new ClientSecretCredential(process.env.TENANT_ID, process.env.CLIENT_ID, process.env.CLIENT_SECRET);

    const blobServiceClient = new BlobServiceClient(
        `https://${process.env.STORAGE_ACCOUNT_NAME}.blob.core.windows.net`,
        creds
        );

    const containerClient = blobServiceClient.getContainerClient(continerName);

    // List the blob(s) in the container.
    for await (const blob of containerClient.listBlobsFlat()) {
        console.log(`Blob: ${blob.name}`);
    }

  }catch(err){
    console.log(`Error: ${err.message}`);
  }
  
}

async function deleteBlob(blobName) {
  try{
    const creds = new ClientSecretCredential(process.env.TENANT_ID, process.env.CLIENT_ID, process.env.CLIENT_SECRET);

    const blobServiceClient = new BlobServiceClient(
        `https://${process.env.STORAGE_ACCOUNT_NAME}.blob.core.windows.net`,
        creds
        );

    const containerClient = blobServiceClient.getContainerClient(continerName);

    // Get a block blob client
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);

    // Delete the blob

    await blockBlobClient.delete();

  }catch(err){
    console.log(`Error: ${err.message}`);
  }
}

async function uploadBlob(blobName, filePath) {
  try{
    const creds = new ClientSecretCredential(process.env.TENANT_ID, process.env.CLIENT_ID, process.env.CLIENT_SECRET);

    const blobServiceClient = new BlobServiceClient(
        `https://${process.env.STORAGE_ACCOUNT_NAME}.blob.core.windows.net`,
        creds
        );

    const containerClient = blobServiceClient.getContainerClient(continerName);

    // Create a blob
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);
    // read file ./sample.pdf
    const fileBuffer = fs.readFileSync(filePath);
    const fileSize = fileBuffer.byteLength;

    await blockBlobClient.upload(fileBuffer, fileSize, {
        blobHTTPHeaders: {
            blobContentType: "application/pdf",
        },
        });
    console.log(`Blob "${blobName}" is uploaded`);

  }catch(err){
    console.log(`Error: ${err.message}`);
  }
}


async function downloadBlob(blobName, filePath) {
  try{
    const creds = new ClientSecretCredential(process.env.TENANT_ID, process.env.CLIENT_ID, process.env.CLIENT_SECRET);

    const blobServiceClient = new BlobServiceClient(
        `https://${process.env.STORAGE_ACCOUNT_NAME}.blob.core.windows.net`,
        creds
        );

    const containerClient = blobServiceClient.getContainerClient(continerName);

    const blockBlobClient = containerClient.getBlockBlobClient(blobName);

    const downloadBlockBlobResponse = await blockBlobClient.download(0);

    // const downloaded = await streamToBuffer(downloadBlockBlobResponse.readableStreamBody);

    // fs.writeFileSync(filePath, downloaded);

    // console.log(`Downloaded blob content to "${filePath}"`);

    return downloadBlockBlobResponse.readableStreamBody;

  }catch(err){
    console.log(`Error: ${err.message}`);
  }
}

// main()
//   .then(() => console.log("Done"))
//   .catch((ex) => console.log(ex.message));

// listObjects().then(() => console.log("Done")).catch((ex) => console.log(ex.message));

// downloadBlob("quickstartd2a6c050-71a9-11ef-933c-7f0d8e894393.pdf", "./downloaded.pdf").then(() => console.log("Done")).catch((ex) => console.log(ex.message));
// module.exports = {  
//     listObjects,
//     deleteBlob,
//     uploadBlob,
//     downloadBlob
// }

listObjects().then(() => console.log("Done")).catch((ex) => console.log(ex.message));