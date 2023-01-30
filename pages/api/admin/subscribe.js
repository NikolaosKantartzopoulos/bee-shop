import { ObjectId } from "mongodb";
import { connectDatabase } from "../../../data/databaseFunctions";

export default async function handler(req, res) {
	const [client, db] = await connectDatabase();
	try {
		switch (req.method) {
			case "POST":
				console.log(req.body);
				const postRes = await db
					.collection("users")
					.updateOne(
						{ _id: new ObjectId(req.body) },
						{ $set: { subscribedAtNewsletter: true } }
					);
				console.log(postRes);
				if (postRes.modifiedCount === 1) {
					res.status(200).json({
						type: "ok",
						text: "Thank you for subscribing to our Newsletter!",
					});
				} else {
					res.status(406);
				}
		}
	} finally {
		await client.close();
	}
}
