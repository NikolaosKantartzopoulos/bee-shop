import React, { useContext, useReducer } from "react";

import { addProductReducer } from "../../../../data/reducers/add-product-reducer";

import Button from "../../../UI/Button";

import styles from "../../../Helper/Input.module.css";
import divStyles from "./AddProductForm.module.css";
import ToolsContext from "../../../../data/context/tools-context";

function AddProductForm() {
	const toolsCtx = useContext(ToolsContext);

	const [productInfo, dispatchProductInfoAction] = useReducer(
		addProductReducer,
		{ title: "", harvestedFrom: "", price: 0, size: 1000, url: "" }
	);

	async function submitHandler(e) {
		e.preventDefault();

		const res = await fetch("/api/admin/add-new-product", {
			method: "POST",
			body: JSON.stringify(productInfo),
			headers: {
				"Content-Type": "application/json",
			},
		});
		if (res.ok) {
			const data = await res.json();

			toolsCtx.setInfo({ type: data.type, text: data.text });
		} else {
			toolsCtx.setInfo({ type: "error", text: "An error occured" });
		}
	}

	return (
		<form onSubmit={submitHandler} className={divStyles.addProductForm}>
			<div className={styles.inputDiv}>
				<label htmlFor="title">Title</label>
				<input
					type="text"
					id="title"
					value={productInfo.title}
					onChange={(e) =>
						dispatchProductInfoAction({
							type: "setTitle",
							title: e.target.value,
						})
					}
				></input>
			</div>
			<div className={styles.inputDiv}>
				<label htmlFor="harvestedFrom">Harvested from</label>
				<input
					type="text"
					id="harvestedFrom"
					value={productInfo.from}
					onChange={(e) =>
						dispatchProductInfoAction({
							type: "setHarvestedFrom",
							harvestedFrom: e.target.value,
						})
					}
				></input>
			</div>
			<div className={styles.inputDiv}>
				<label htmlFor="price">Price</label>
				<input
					type="number"
					id="price"
					value={productInfo.price}
					onChange={(e) =>
						dispatchProductInfoAction({
							type: "setPrice",
							price: e.target.value,
						})
					}
				></input>
			</div>
			<div className={styles.inputDiv}>
				<label htmlFor="size">Size</label>
				<input
					type="number"
					id="size"
					value={productInfo.size}
					onChange={(e) =>
						dispatchProductInfoAction({
							type: "setSize",
							size: e.target.value,
						})
					}
				></input>
			</div>
			<div className={styles.inputDiv}>
				<label htmlFor="url">URL</label>
				<input
					type="text"
					id="url"
					value={productInfo.from}
					onChange={(e) =>
						dispatchProductInfoAction({
							type: "setUrl",
							url: e.target.value,
						})
					}
				></input>
			</div>
			<Button type="submit">Add new product</Button>
		</form>
	);
}

export default AddProductForm;
