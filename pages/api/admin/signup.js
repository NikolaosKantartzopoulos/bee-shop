import { connectDatabase } from "../../../data/databaseFunctions";

export default async function handler(req, res) {
	const [client, db] = await connectDatabase();
	try {
		switch (req.method) {
			case "POST":
				const signupItem = JSON.parse(req.body);
				const existingEmails = await db.collection("users").distinct("email");
				if (existingEmails.includes(signupItem.email)) {
					res.status(406).json({ type: "error", text: "Email exists" });
					break;
				} else {
					const postResOK = await db
						.collection("users")
						.insertOne({ ...signupItem, admin: false });
					if (postResOK.acknowledged) {
						res.status(200).json({
							type: "ok",
							text: "User Created",
							newUser: { ...signupItem, _id: postResOK.insertedId },
						});
					}
				}
		}
	} finally {
		await client.close();
	}
}
