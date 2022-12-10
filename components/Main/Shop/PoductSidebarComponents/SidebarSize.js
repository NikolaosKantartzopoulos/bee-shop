import React from "react";

function SidebarSize({ dispatchInputStateAction, inputState }) {
	return (
		<div>
			<h4>Size</h4>
			<label htmlFor="sizeLowest">
				From:
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
				To:
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
			<button
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
			</button>
		</div>
	);
}

export default SidebarSize;
