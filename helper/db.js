import { MongoClient } from "mongodb";

export async function connectDatabase() {
	const connectionURL = `mongodb+srv://NikolaosKantartzopoulos:Kalamarakia_1234@cluster0.pvjhsk4.mongodb.net/?retryWrites=true&w=majority`;
	const client = await MongoClient.connect(connectionURL);
	return client;
}

export async function insertDocument(client, collection, document) {
	const db = client.db();

	const result = await db.collection(collection).insertOne(document);

	return result;
}

export async function getAllDocuments(client, collection) {
	const db = client.db();

	const documents = await db.collection(collection).find().toArray();

	return documents;
}
