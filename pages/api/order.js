import { connectDatabase } from "../../data/databaseFunctions";

export default async function handler(req, res) {
	const [client, db] = await connectDatabase();
	try {
		if (req.method === "POST") {
			const newOrder = {
				date: new Date().toISOString(),
				items: req.body.order.items,
				totalCost: req.body.order.totalCost,
				user: req.body.user,
			};

			const orderRes = await db.collection("orders").insertOne(newOrder);
			if (orderRes.acknowledged) {
				res
					.status(200)
					.json({ type: "ok", text: "Order submited successfully!" });
			} else {
				res.status(500).json({ type: "error", text: "An error occured!" });
			}
		}
	} finally {
		await client.close();
	}
}
