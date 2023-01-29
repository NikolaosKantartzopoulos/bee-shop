import { ObjectId } from "mongodb";
import { connectDatabase } from "../../../data/databaseFunctions";

export default async function handler(req, res) {
	const [client, db] = await connectDatabase();
	try {
		switch (req.method) {
			case "PUT":
				const { newStatus, orderId } = JSON.parse(req.body);
				const putRes = await db
					.collection("orders")
					.updateOne(
						{ _id: new ObjectId(orderId) },
						{ $set: { status: newStatus } }
					);

				if (putRes.modifiedCount === 1) {
					res.status(200).json({ type: "ok", text: "Order status Updated" });
				} else {
					res.status(500);
				}
		}
	} finally {
		await client.close();
	}
}
