import React from "react";
import Cart from "./Cart";
import Navbar from "./Navbar/Navbar";
import LoginButton from "../UI/login-button";
import styles from "./Header.module.css";

function Header() {
	return (
		<header className={styles.headerStyles}>
			<Navbar />
			<Cart />
			<LoginButton />
		</header>
	);
}

export default Header;
