import React from "react";
import Cart from "./Cart";
import Navbar from "./Navbar/Navbar";

import styles from "./Header.module.css";

function Header() {
	return (
		<header className={styles.headerStyles}>
			<Navbar />
			<Cart />
		</header>
	);
}

export default Header;
