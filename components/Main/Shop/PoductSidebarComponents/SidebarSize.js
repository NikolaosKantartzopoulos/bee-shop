import Button from "../../../UI/Button";

import React from "react";

import styles from "./ProductsSidebarComponents.module.css";

function SidebarSize({ dispatchInputStateAction, inputState }) {
	return (
		<div>
			<h4>Size</h4>
			<div className={styles.priceRangeSection}>
				<label htmlFor="sizeLowest">
					From gr
					<input
						id="sizeLowest"
						type="number"
						value={inputState.sizeLowest}
						onChange={(e) => {
							dispatchInputStateAction({
								type: "setSizeLowest",
								sizeLowest: e.target.value,
							});
						}}
					></input>
				</label>
				<label htmlFor="sizeHighest">
					To gr
					<input
						id="sizeHighest"
						value={inputState.sizeHighest}
						type="number"
						onChange={(e) =>
							dispatchInputStateAction({
								type: "setSizeHighest",
								sizeHighest: e.target.value,
							})
						}
					></input>
				</label>
				<Button
					onClick={() => {
						dispatchInputStateAction({
							type: "setSizeLowest",
							sizeLowest: 0,
						});
						dispatchInputStateAction({
							type: "setSizeHighest",
							sizeHighest: 1000,
						});
					}}
				>
					Reset Volumes
				</Button>
			</div>
		</div>
	);
}

export default SidebarSize;
