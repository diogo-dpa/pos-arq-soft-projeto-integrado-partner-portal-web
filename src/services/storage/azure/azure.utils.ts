import { AzureBlobStorage } from "./azureblob.storage";

export async function uploadMultipleFiles(files: File[]) {
	const urlLinks: Array<string> = [];

	if (files.length === 0) return urlLinks;

	const azureBlobStorage = new AzureBlobStorage();

	const containerClient = await azureBlobStorage.createContainer();

	for (let index = 0; index < files.length; index++) {
		const file = files[index];
		const y = await azureBlobStorage.uploadFile(
			containerClient,
			`${new Date().getTime()}.${file.name.split(".").pop()}`,
			file
		);
		urlLinks.push(y?.url.split("?")[0] ?? "");
	}

	return urlLinks;
}
