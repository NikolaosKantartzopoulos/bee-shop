import React from "react";

function SidebarFrom({ handleFromSelection, inputState, products }) {
	return (
		<div>
			<h4>Harvested from:</h4>
			<select
				onChange={(e) => handleFromSelection(e)}
				value={inputState.selectedFrom}
			>
				<option key="All">All</option>
				{products
					.map((x) => x.from)
					.filter((x, i, a) => a.indexOf(x) === i)
					.sort()
					.map((product) => (
						<option key={product} value={product}>
							{product}
						</option>
					))}
			</select>
		</div>
	);
}

export default SidebarFrom;
