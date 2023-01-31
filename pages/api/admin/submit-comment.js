import { connectDatabase } from "../../../data/databaseFunctions";

export default async (req, res) => {
	const [client, db] = await connectDatabase();
	try {
		switch (req.method) {
			case "POST":
				console.log(req.body);
				const postRes = await db
					.collection("comments")
					.insertOne(JSON.parse(req.body));

				if (postRes.acknowledged) {
					res
						.status(200)
						.json({ type: "ok", text: "Thank you for your comments!" });
				} else {
					res.status(500).json({ type: "error", text: "An error occured..." });
				}

				break;
		}
	} finally {
		await client.close();
	}
};
