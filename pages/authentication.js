import React, { useReducer } from "react";
import Button from "../components/UI/Button";

import { credentialsReducer } from "../data/reducers/credentials-reducer";

import styles from "../components/Main/Authentication/Authentication.module.css";

function Authentication() {
	const [credentials, dispatchCredentialsAction] = useReducer(
		credentialsReducer,
		{ username: "", email: "", password: "" }
	);

	function handleSubscription(e) {
		e.preventDefault();

		fetch("/api/authentication", {
			method: "POST",
			body: JSON.stringify({ credentials: credentials }),
			headers: {
				"Content-Type": "application/json",
			},
		}).then((res) => res.json());
	}
	return (
		<div>
			<form onSubmit={handleSubscription}>
				<div className={styles.inputDiv}>
					<label htmlFor="Username">
						Username
						<input
							type="text"
							id="Username"
							value={credentials.username}
							onChange={(e) =>
								dispatchCredentialsAction({
									type: "setUsername",
									username: e.target.value,
								})
							}
						></input>
					</label>
				</div>
				<div className={styles.inputDiv}>
					<label htmlFor="email">
						Email
						<input
							type="email"
							id="email"
							value={credentials.email}
							onChange={(e) =>
								dispatchCredentialsAction({
									type: "setEmail",
									email: e.target.value,
								})
							}
						></input>
					</label>
				</div>
				<div className={styles.inputDiv}>
					<label htmlFor="password">
						Password
						<input
							type="password"
							id="password"
							value={credentials.password}
							onChange={(e) =>
								dispatchCredentialsAction({
									type: "setPassword",
									password: e.target.value,
								})
							}
						></input>
					</label>
				</div>
				<Button>Subscribe</Button>
			</form>
		</div>
	);
}

export default Authentication;
