import { ObjectId } from "mongodb";
import React from "react";
import OrderBox from "../../../components/Main/admin/manage-orders/OrderBox";
import { connectDatabase } from "../../../data/databaseFunctions";

function CheckOrderPageRoute({ order }) {
	return <OrderBox order={order} />;
}

export default CheckOrderPageRoute;

export async function getServerSideProps(ctx) {
	const [client, db] = await connectDatabase();
	const orderOBJ = await db
		.collection("orders")
		.findOne({ _id: new ObjectId(ctx.query.orderId) });

	const order = { ...orderOBJ, _id: orderOBJ._id.toString() };

	await client.close();
	return {
		props: {
			order: order,
		},
	};
}
