import React, { useReducer } from "react";

import { addProductReducer } from "../../Helper/reducerFn";

import styles from "../../Helper/Input.module.css";

function AddProductForm() {
	const [productInfo, dispatchProductInfoAction] = useReducer(
		addProductReducer,
		{ title: "", harvestedFrom: "", price: 0, size: 1000, url: "" }
	);

	function submitHandler() {}

	return (
		<form onSubmit={submitHandler}>
			<div className={styles.inputDiv}>
				<label htmlFor="title">
					Title
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
				</label>
			</div>
			<div className={styles.inputDiv}>
				<label htmlFor="harvestedFrom">
					Harvested from
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
				</label>
			</div>
			<div className={styles.inputDiv}>
				<label htmlFor="price">
					Price
					<input
						type="text"
						id="price"
						value={productInfo.price}
						onChange={(e) =>
							dispatchProductInfoAction({
								type: "setPrice",
								price: e.target.value,
							})
						}
					></input>
				</label>
			</div>
			<div className={styles.inputDiv}>
				<label htmlFor="size">
					Size
					<input
						type="text"
						id="size"
						value={productInfo.size}
						onChange={(e) =>
							dispatchProductInfoAction({
								type: "setSize",
								size: e.target.value,
							})
						}
					></input>
				</label>
			</div>
			<div className={styles.inputDiv}>
				<label htmlFor="url">
					URL
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
				</label>
			</div>
			<button>Add new product</button>
		</form>
	);
}

export default AddProductForm;
