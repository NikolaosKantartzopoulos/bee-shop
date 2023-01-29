import React from "react";
import Cart from "./Cart";
import Navbar from "./Navbar/Navbar";
import LoginButton from "../UI/login-button";
import styles from "./Header.module.css";

function Header({ setInProp }) {
	return (
		<header className={styles.headerStyles}>
			<Navbar setInProp={setInProp} />
			<div className={styles.RightNavbarPart}>
				<Cart />
				<LoginButton />
			</div>
		</header>
	);
}

export default Header;
