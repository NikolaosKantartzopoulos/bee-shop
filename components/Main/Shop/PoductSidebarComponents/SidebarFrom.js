import React from "react";

function SidebarFrom({ handleFromSelection, inputState, products }) {
	return (
		<section>
			<h1>Harvested from</h1>
			<select
				onChange={(e) => handleFromSelection(e)}
				value={inputState.selectedFrom}
			>
				<option key="All">All</option>
				{products
					.map((x) => x.harvestedFrom)
					.filter((x, i, a) => a.indexOf(x) === i)
					.sort()
					.map((product) => (
						<option key={product} value={product}>
							{product}
						</option>
					))}
			</select>
		</section>
	);
}

export default SidebarFrom;
