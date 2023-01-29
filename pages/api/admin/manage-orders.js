import { connectDatabase } from "../../../data/databaseFunctions";

export default async function handler(req, res) {
	const [client, db] = await connectDatabase();

	try {
		switch (req.method) {
			case "PUT":
				const { seenVisible, gatheringProductsVisible, courier, lastWeek } =
					JSON.parse(req.body);

				const today = new Date();
				if (lastWeek) {
					today.setDate(today.getDate() - 7);
				} else {
					today.setMonth(today.getMonth() - 1);
				}

				const orArray = [];
				if (seenVisible) {
					orArray.push({ status: "seen" });
				}
				if (gatheringProductsVisible) {
					orArray.push({ status: "gathering products" });
				}
				if (courier) {
					orArray.push({ status: "courier" });
				}
				if (orArray.length > 0) {
					const orders = await db
						.collection("orders")
						.find({ $or: orArray, date: { $gte: today.toISOString() } })
						.toArray();

					res.status(200).json(orders.map((ord) => ({ ...ord, _id: ord._id })));
				} else {
					res.status(200).json([]);
				}
				break;
		}
	} finally {
		await client.close();
	}
}
