import React from "react";

import { useSession } from "next-auth/react";

import Cart from "./Cart";
import Navbar from "./Navbar/Navbar";
import LoginButton from "../UI/login-button";
import styles from "./Header.module.css";

function Header({ setInProp }) {
	const { data: session } = useSession();
	if (session) {
		return (
			<header className={styles.headerStylesSession}>
				<Navbar setInProp={setInProp} />
				<div className={styles.RightNavbarPart}>
					<Cart />
					<LoginButton />
				</div>
			</header>
		);
	} else {
		return (
			<header className={styles.headerStylesNoSession}>
				<Navbar setInProp={setInProp} />
				<div className={styles.RightNavbarPart}>
					<Cart />
					<LoginButton />
				</div>
			</header>
		);
	}
}

export default Header;
