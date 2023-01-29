import React from "react";

import styles from "../../components/Helper/pages-css/ManageOrders.module.css";
import OrderBox from "../../components/Main/admin/manage-orders/OrderBox";
import OrdersTable from "../../components/Main/admin/manage-orders/OrdersTable";
import { connectDatabase } from "../../data/databaseFunctions";

function ManageOrders({ allOrders }) {
	const order = allOrders[2];

	return (
		<div className={styles.ManageOrdersPageRoute}>
			<h4>Orders</h4>
			<OrdersTable allOrders={allOrders} />
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
