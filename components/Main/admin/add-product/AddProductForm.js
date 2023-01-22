import React, { useContext, useReducer } from "react";

import { addProductReducer } from "../../../../data/reducerFn";

import UrlContext from "../../../../data/url-context";

import styles from "../../../Helper/Input.module.css";

function AddProductForm() {
	const urlContext = useContext(UrlContext);
	const [productInfo, dispatchProductInfoAction] = useReducer(
		addProductReducer,
		{ title: "", harvestedFrom: "", price: 0, size: 1000, url: "" }
	);

	function submitHandler(e) {
		e.preventDefault();

		fetch("/api/add-new-product", {
			method: "POST",
			body: JSON.stringify(productInfo),
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then((res) => res.json())
			.then((data) => console.log(data));
	}

	return (
		<form onSubmit={submitHandler}>
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
			<button>Add new product</button>
		</form>
	);
}

export default AddProductForm;
