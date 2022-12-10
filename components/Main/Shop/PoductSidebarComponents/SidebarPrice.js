import React from "react";

function SidebarPrice({ dispatchInputStateAction, inputState }) {
	return (
		<div>
			<h4>Price</h4>
			<div>
				<label htmlFor="lowerPrice">
					From:
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
					To:
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
				<button
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
				</button>
			</div>
		</div>
	);
}

export default SidebarPrice;
