import React from "react";

import styles from "../../components/Helper/pages-css/ManageOrders.module.css";
import OrderBox from "../../components/Main/admin/manage-orders/OrderBox";
import { connectDatabase } from "../../data/databaseFunctions";

function ManageOrders({ allOrders }) {
	const order = allOrders[2];
	console.log(order);

	return (
		<div className={styles.ManageOrdersPageRoute}>
			<h4>Orders</h4>
			<OrderBox order={order} />
		</div>
	);
}

export default ManageOrders;

export const getServerSideProps = async (ctx) => {
	const [client, db] = await connectDatabase();
	const orders = await db.collection("orders").find().toArray();
	const allOrders = orders.map((ord) => ({ ...ord, _id: ord._id.toString() }));
	await client.close();
	return {
		props: {
			allOrders: allOrders,
		},
	};
};
