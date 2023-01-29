import { useRouter } from "next/router";
import React from "react";

import styles from "./OrdersTable.module.css";

function OrdersTable({ allOrders }) {
	const router = useRouter();

	async function handleRowClick(e, orderId) {
		router.push(`/admin/check-order/${orderId}`);
	}

	return (
		<table className={styles.productsTable}>
			<thead>
				<tr>
					<th>Order ID</th>
					<th>Date</th>
					<th>Status</th>
					<th>Ship. Addr.</th>
					<th>€</th>
				</tr>
			</thead>
			<tbody>
				{allOrders
					.sort((a, b) => (a.date > b.date ? 1 : -1))
					.map((ord) => (
						<tr key={ord._id} onClick={(e) => handleRowClick(e, ord._id)}>
							<td>{ord._id}</td>
							<td>{new Date(ord.date).toLocaleString("en-GB")}</td>
							<td
								style={{
									textAlign: "center",
									backgroundColor:
										ord.status === "seen"
											? "red"
											: ord.status === "gathering products"
											? "orange"
											: "green",
								}}
							>
								{ord.status}
							</td>
							<td>{ord.user.shippingAddress}</td>
							<td>{ord.totalCost}</td>
						</tr>
					))}
			</tbody>
		</table>
	);
}

export default OrdersTable;
