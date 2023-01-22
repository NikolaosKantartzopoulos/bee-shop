import { connectDatabase } from "../../data/db";

export default async function handler(req, res) {
	const [client, db] = await connectDatabase();
	try {
		switch (req.method) {
			case "POST":
				console.log(req.body);
				const postRes = await db.collection("products").insertOne(req.body);
				if (postRes.acknowledged) {
					res.status(200).json({ type: "ok", text: "Product submited" });
				} else {
					res.status(500);
				}
		}
	} finally {
		client.close();
	}
}
