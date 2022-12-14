import React from "react";

function Input(props) {
	return (
		<div className={props.className}>
			<label htmlFor={props.id}>
				{props.id}
				<input
					type="text"
					id={props.id}
					value={props.value}
					onChange={props.onChange}
				></input>
			</label>
		</div>
	);
}

export default Input;
