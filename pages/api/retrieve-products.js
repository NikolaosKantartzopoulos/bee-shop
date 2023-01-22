import { connectDatabase, getAllDocuments } from "../../data/db";

export default async function handler(req, res) {
	if (req.method === "GET") {
		const [client, db] = await connectDatabase();
		const documents = await db.collection("products").find().toArray();

		client.close();

		res.status(200).json({ documents: documents });
	}
}
