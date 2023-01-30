import React, { useContext, useEffect, useState } from "react";

import { getSession } from "next-auth/react";
import { useRouter } from "next/router";

import { connectDatabase } from "../../data/databaseFunctions";

import ShowcaseContext from "../../data/context/showcase-context";

import styles from "./products-table.module.css";
import ToolsContext from "../../data/context/tools-context";

function TableInput({ value, onChange }) {
	return <input value={value} onChange={onChange} />;
}

function ProductsTable({ allProducts }) {
	const router = useRouter();
	const showcaseCtx = useContext(ShowcaseContext);
	const toolsCtx = useContext(ToolsContext);

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
	async function deleteItem(e, item) {
		const res = await fetch("/api/admin/manage-products", {
			method: "DELETE",
			headers: { "Content-Type": "text/plain" },
			body: item._id,
		});
		if (res.ok) {
			const data = await res.json();

			toolsCtx.setInfo(data);
		} else {
			toolsCtx.setInfo({ type: "error", text: "An error occured" });
		}
		router.reload();
	}

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
		<section style={{ overflow: "hidden" }}>
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
		</section>
	);
}

export default ProductsTable;

export async function getServerSideProps(context) {
	const session = await getSession({ req: context.req });

	if (!session) {
		return {
			redirect: {
				destination: "/about-us",
				permanent: false,
			},
		};
	}

	const [client, db] = await connectDatabase();
	const documents = await db.collection("products").find().toArray();

	const allProducts = documents.map((p) => ({ ...p, _id: p._id.toString() }));
	return {
		props: { allProducts },
	};
}
