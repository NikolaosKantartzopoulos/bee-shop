import { MongoClient } from "mongodb";

export default async function handler(req, res) {
	if (req.method === "POST") {
		console.log("---------------connected--------------");
		const newProduct = {
			date: new Date().toISOString,
			...req.body.productInfo,
		};
		console.log(newProduct);

		const connectionURL =
			"mongodb+srv://NikolaosKantartzopoulos:Kalamarakia_1234@cluster0.pvjhsk4.mongodb.net/?retryWrites=true&w=majority";

		const client = await MongoClient.connect(connectionURL);
		const db = client.db();
		const result = await db.collection("products").insertOne(newProduct);
		res.status(200).json({ message: "ok", newProduct: { newProduct } });
		console.log(result);
		client.close();
	}
}
