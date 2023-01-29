import { useRouter } from "next/router";
import React, { useContext } from "react";
import ToolsContext from "../../../../data/context/tools-context";
import Button from "../../../UI/Button";

import styles from "./OrderBox.module.css";
import tableStyles from "./OrdersTable.module.css";

function OrderBox({ order }) {
	const localDate = new Date(order.date).toLocaleString("en-GB");
	const router = useRouter();

	const toolsCtx = useContext(ToolsContext);

	let statusBGC = "";
	if (order.status === "seen") {
		statusBGC = "red";
	} else if (order.status == "gathering products") {
		statusBGC = "orange";
	} else {
		statusBGC = "lightgreen";
	}

	async function handleOrderStatusChange(newStatus) {
		console.log(newStatus);
		console.log(order._id);
		const res = await fetch("/api/admin/change-order-status", {
			method: "PUT",
			headers: { "Content-Type": "application-json" },
			body: JSON.stringify({ newStatus: newStatus, orderId: order._id }),
		});
		if (res.ok) {
			let data = await res.json();
			toolsCtx.setInfo(data);
			setTimeout(() => router.reload(), 1000);
		}
	}

	return (
		<div className={styles.orderBox}>
			<div className={styles.statusDiv}>
				<h4 className={styles.orderStatusHeader}>
					<Button onClick={() => router.push("/admin/manage-orders")}>
						Back
					</Button>
					<p>Status</p>
					<span style={{ backgroundColor: statusBGC }}>
						<select
							onChange={(e) => handleOrderStatusChange(e.target.value)}
							value={order.status}
						>
							<option value="seen">Seen</option>
							<option value="gathering products">Gathering Products</option>
							<option value="courier">Courier</option>
						</select>
					</span>
				</h4>
				<table className={tableStyles.productsTable}>
					<tbody>
						<tr>
							<td>Date</td>
							<td>{localDate}</td>
						</tr>
						<tr>
							<td>Order ID</td>
							<td>{order._id}</td>
						</tr>
					</tbody>
				</table>
			</div>
			<div className={styles.statusDiv}>
				<h4>Items</h4>
				<div className={styles.itemsDiv}>
					<table className={tableStyles.productsTable}>
						<thead>
							<tr>
								<th>Product</th>
								<th>Amount</th>
								<th>Price</th>
								<th>€</th>
								<th>Weight</th>
							</tr>

							{order.items.map((item) => {
								let itemsPay = Number(item.price) * Number(item.numberOfItems);
								return (
									<tr key={item._id}>
										<td>{item.title}</td>
										<td style={{ textAlign: "center" }}>
											{item.numberOfItems}
										</td>
										<td>{item.price}</td>
										<td>{itemsPay}</td>
										<td>{item.size}</td>
									</tr>
								);
							})}
						</thead>
					</table>
				</div>
			</div>
			<div className={styles.statusDiv}>
				<h4>Shipping information</h4>
				<table className={tableStyles.productsTable}>
					<tbody>
						<tr>
							<td>Username</td>
							<td>{order.user.username}</td>
						</tr>
						<tr>
							<td>Fullname</td>
							<td>{order.user.fullname}</td>
						</tr>
						<tr>
							<td>Ship. Address</td>
							<td>{order.user.shippingAddress}</td>
						</tr>
						<tr>
							<td>Billing Address</td>
							<td>{order.user.billingAddress}</td>
						</tr>
						<tr>
							<td>Payment</td>
							<td>{order.totalCost} €</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	);
}

export default OrderBox;
