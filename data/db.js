import { MongoClient } from "mongodb";

export async function connectDatabase() {
	const connectionURL = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.${process.env.DB_STRING}.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

	const client = await MongoClient.connect(connectionURL);
	const db = client.db();
	return [client, db];
}

export async function insertDocument(client, collection, document) {
	const result = await db.collection(collection).insertOne(document);

	return result;
}

export async function getAllDocuments(client, collection) {
	const documents = await db.collection(collection).find().toArray();

	return documents;
}
