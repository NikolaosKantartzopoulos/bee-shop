import { useRouter } from "next/router";
import React, { useContext, useEffect, useReducer, useState } from "react";

import { connectDatabase } from "../../data/db";

import ShowcaseContext from "../../data/ShowcaseContext";

import styles from "./products-table.module.css";

function TableInput({ value, onChange }) {
	return <input value={value} onChange={onChange} />;
}

function ProductsTable({ allProducts }) {
	const router = useRouter();
	const showcaseCtx = useContext(ShowcaseContext);
	const emptyValues = {
		_id: "",
		title: "",
		harvestedFrom: "",
		price: "",
		size: "",
		url: "",
	};
	const [editValues, setEditValues] = useState(emptyValues);

	useEffect(() => {
		showcaseCtx.setShowcaseDatabase(allProducts);
		showcaseCtx.resetShowcase(allProducts);
	}, []);

	function editItem(e, item) {
		setEditValues({
			_id: item._id,
			title: item.title,
			harvestedFrom: item.harvestedFrom,
			price: item.price,
			size: item.size,
			url: item.url,
		});
	}
	function deleteItem(e, item) {}

	async function handleSubmitEditProduct() {
		const editRes = await fetch("/api/admin/manage-products", {
			method: "PUT",
			headers: { "Content-Type": "application-json" },
			body: JSON.stringify(editValues),
		});
		if (editRes.ok) {
			let data = await editRes.json();

			setEditValues(emptyValues);
			router.reload();
		}
	}

	if (!allProducts) {
		return <div>Loading...</div>;
	}

	return (
		<table className={styles.productsTable}>
			<thead>
				<tr>
					<th>Title</th>
					<th>From</th>
					<th>€</th>
					<th>Size</th>
				</tr>
			</thead>
			<tbody>
				{showcaseCtx.itemsShowcased.length > 0 &&
					showcaseCtx.itemsShowcased.map((item) => (
						<tr
							key={item._id}
							style={{
								backgroundColor:
									editValues._id === item._id ? "lightblue" : null,
							}}
						>
							<td>
								{editValues._id === item._id ? (
									<TableInput
										value={editValues.title}
										onChange={(e) =>
											setEditValues({ ...editValues, title: e.target.value })
										}
									/>
								) : (
									item.title
								)}
							</td>
							<td>
								{editValues._id === item._id ? (
									<TableInput
										value={editValues.harvestedFrom}
										onChange={(e) =>
											setEditValues({
												...editValues,
												harvestedFrom: e.target.value,
											})
										}
									/>
								) : (
									item.harvestedFrom
								)}
							</td>
							<td>
								{editValues._id === item._id ? (
									<TableInput
										value={editValues.price}
										onChange={(e) =>
											setEditValues({ ...editValues, price: e.target.value })
										}
									/>
								) : (
									item.price
								)}
							</td>
							<td>
								{editValues._id === item._id ? (
									<TableInput
										value={editValues.size}
										onChange={(e) =>
											setEditValues({ ...editValues, size: e.target.value })
										}
									/>
								) : (
									item.size
								)}
							</td>

							{editValues._id === item._id ? (
								<td
									className={styles.interactiveItemEdit}
									onClick={handleSubmitEditProduct}
								>
									Save
								</td>
							) : (
								<>
									<td
										className={styles.interactiveItemEdit}
										onClick={(e) => editItem(e, item)}
									>
										Edit
									</td>

									{!editValues._id && (
										<td
											className={styles.interactiveItemDelete}
											onClick={(e) => deleteItem(e, item)}
										>
											Delete
										</td>
									)}
								</>
							)}
						</tr>
					))}
			</tbody>
		</table>
	);
}

export default ProductsTable;

export async function getStaticProps() {
	const [client, db] = await connectDatabase();
	const documents = await db.collection("products").find().toArray();

	const allProducts = documents.map((p) => ({ ...p, _id: p._id.toString() }));
	return {
		props: { allProducts },
	};
}
