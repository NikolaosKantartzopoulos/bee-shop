import fs from "fs";
import path from "path";

export default function handler(req, res) {
	if (req.method === "POST") {
		const newOrder = {
			date: new Date().toISOString(),
			order: req.body.order,
		};

		const filePath = path.join(process.cwd(), "data", "orders.json");
		const fileData = fs.readFileSync(filePath);
		const data = JSON.parse(fileData);
		data.push(newOrder);
		fs.writeFileSync(filePath, JSON.stringify(data));
		res.status(200).json({ message: "Order Confirmed", order: newOrder });
	}
}
