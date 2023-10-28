import { BlobServiceClient, ContainerClient } from "@azure/storage-blob";

export class AzureBlobStorage {
	private account = process.env.REACT_APP_STORAGE_ACCOUNT;
	private sas = process.env.REACT_APP_SAS_KEY;
	private blobName = process.env.REACT_APP_BLOB_NAME;
	private blobServiceClient = new BlobServiceClient(
		`https://${this.account}.blob.core.windows.net/${this.blobName}${this.sas}`
	);
	private containerName = process.env.REACT_APP_CONTAINER_NAME;

	async createContainer() {
		return this.blobServiceClient.getContainerClient(this.containerName ?? "");
	}

	async uploadFile(container: ContainerClient, blobName: string, file: File) {
		const blockBlobClient = container.getBlockBlobClient(blobName);

		const blockBlobUploadResponse = await blockBlobClient?.upload(
			file,
			file.size
		);

		if (blockBlobUploadResponse.errorCode)
			throw Error(blockBlobUploadResponse.errorCode);

		return blockBlobClient;
	}
}
