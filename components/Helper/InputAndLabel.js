import React from "react";

import styles from "./Input.module.css";

function InputAndLabel({ label, value, setValue }) {
	return (
		<div className={styles.inputDiv}>
			<label htmlFor={label}>{label}</label>
			<input
				id={label}
				value={value}
				onChange={(e) => setValue(e.target.value)}
			/>
		</div>
	);
}

export default InputAndLabel;
