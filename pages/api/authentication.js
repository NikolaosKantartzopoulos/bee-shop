import fs from "fs";
import path from "path";
import { MongoClient } from "mongodb";

export default async function hander(req, res) {
	let userExists = false;

	const newUser = {
		date: new Date(),
		...req.body.credentials,
	};

	const connectionURL =
		"mongodb+srv://NikolaosKantartzopoulos:Kalamarakia_1234@cluster0.pvjhsk4.mongodb.net/?retryWrites=true&w=majority";

	if (req.method === "POST") {
		const client = await MongoClient.connect(connectionURL);
		const db = client.db();

		// const filePath = path.join(process.cwd(), "data", "users.json");
		// const fileData = fs.readFileSync(filePath);
		// const data = JSON.parse(fileData);

		// //check if user exists

		const data = await db.collection("users").find().toArray();

		data.forEach((item) => {
			if (item.email === newUser.email) {
				userExists = true;
			}
		});

		if (userExists) {
			res.status(400).json({ message: "Email Exists", user: newUser });
		} else {
			const result = await db.collection("users").insertOne(newUser);
			res.status(201).json({ message: "Signed Up!", user: { ...newUser } });
			console.log(result);
		}
		client.close();
	}
}
