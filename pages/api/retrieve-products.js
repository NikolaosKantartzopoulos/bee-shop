import { connectDatabase, getAllDocuments } from "../../helper/db";

export default async function handler(req, res) {
	if (req.method === "GET") {
		console.log("--------------------------------------");
		const client = await connectDatabase();
		const documents = await getAllDocuments(client, "products");
		console.log(documents);
		res.status(200).json({ documents: documents });
	}
}
