import React, { useEffect } from "react";

import styles from "./Shop.module.css";

function ProductSidebar({ products }) {
	const productsFrom = products
		.map((x) => x.from)
		.filter((x, i, a) => a.indexOf(x) === i)
		.sort();

	return (
		<div className={styles.sidebarSection}>
			<div>
				<h4>From</h4>
				<ul>
					{productsFrom.map((pr) => (
						<li key={pr}>{pr}</li>
					))}
				</ul>
			</div>
			<div>
				<h4>Price</h4>
			</div>
			<div>
				<h4>Size</h4>
			</div>
		</div>
	);
}

export default ProductSidebar;
