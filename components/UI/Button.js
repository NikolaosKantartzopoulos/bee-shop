import React from "react";

import styles from "./Button.module.css";

const Button = (props) => {
	return (
		<button
			onClick={props.onClick}
			disabled={props.disabled}
			className={styles.myButton}
			type={props.type || "Button"}
			style={props.customStyle}
		>
			{props.children}
		</button>
	);
};

export default Button;
