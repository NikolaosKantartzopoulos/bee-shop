import fs from "fs";
import path from "path";

export default function handler(req, res) {
	if (req.method === "POST") {
		const newSubscription = {
			id: new Date().toISOString,
			email: req.body.email,
			comments: req.body.comments,
		};

		const filePath = path.join(process.cwd(), "data", "newsletter.json");
		const fileData = fs.readFileSync(filePath);
		const data = JSON.parse(fileData);
		data.push(newSubscription);
		fs.writeFileSync(filePath, JSON.stringify(data));
		res
			.status(201)
			.json({ message: "Success!", subscription: newSubscription });
	} else if (req.method === "GET") {
		const filePath = path.join(process.cwd(), "data", "newsletter.json");
		const fileData = fs.readFileSync(filePath);
		const data = JSON.parse(fileData);
		res.status(200).json({ subscriptions: data });
	}
}
