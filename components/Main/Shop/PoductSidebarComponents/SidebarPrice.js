import Button from "../../../UI/Button";

import React from "react";

import styles from "./ProductsSidebarComponents.module.css";

function SidebarPrice({ dispatchInputStateAction, inputState }) {
	return (
		<section>
			<h4>Price</h4>
			<div id="price-range" className={styles.priceRangeSection}>
				<label htmlFor="lowerPrice">
					From €
					<input
						id="lowerPrice"
						type="number"
						value={inputState.lowerPrice}
						onChange={(e) => {
							dispatchInputStateAction({
								type: "setLowerPrice",
								lowerPrice: e.target.value,
							});
						}}
					></input>
				</label>
				<label htmlFor="higherPrice">
					To €
					<input
						id="higherPrice"
						value={inputState.higherPrice}
						type="number"
						onChange={(e) =>
							dispatchInputStateAction({
								type: "setHigherPrice",
								higherPrice: e.target.value,
							})
						}
					></input>
				</label>
				<Button
					onClick={() => {
						dispatchInputStateAction({
							type: "setLowerPrice",
							lowerPrice: 0,
						});
						dispatchInputStateAction({
							type: "setHigherPrice",
							higherPrice: 50,
						});
					}}
				>
					Reset Prices
				</Button>
			</div>
		</section>
	);
}

export default SidebarPrice;
