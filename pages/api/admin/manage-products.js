import { ObjectId } from "mongodb";
import { connectDatabase } from "../../../data/databaseFunctions";

export default async function handler(req, res) {
	const [client, db] = await connectDatabase();

	try {
		switch (req.method) {
			case "PUT":
				//
				const item = JSON.parse(req.body);
				const putRes = await db
					.collection("products")
					.replaceOne(
						{ _id: new ObjectId(item._id) },
						{ ...item, _id: new ObjectId(item._id) }
					);

				if (putRes.acknowledged) {
					res
						.status(200)
						.json({ type: "ok", text: "Item edited successfully" });
				}

				break;
		}
	} finally {
		client.close();
	}
}
