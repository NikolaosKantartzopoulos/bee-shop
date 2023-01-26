import { useSession, signIn, signOut } from "next-auth/react";
import Image from "next/image";
import { useContext, useState } from "react";
import ToolsContext from "../../data/context/tools-context";

import accountIcon from "../../public/assets/images/account.svg";
import Button from "./Button";

import styles from "./login-button.module.css";

export default function Component() {
	const toolsCtx = useContext(ToolsContext);

	const { data: session } = useSession();
	const [dropdownVisible, setDropdownVisible] = useState(false);

	const [usernameInput, setUsernameInput] = useState("");
	const [passwordInput, setPasswordInput] = useState("");
	const [emailInput, setEmailInput] = useState("");
	const [signUpFormVisible, setSignUpFormVisible] = useState(false);

	async function sendSignupPOST() {
		if (
			usernameInput.trim() === "" ||
			passwordInput.trim() === "" ||
			emailInput.trim() === ""
		) {
			return;
		}
		const postRes = await fetch("/api/admin/signup", {
			method: "POST",
			headers: {
				"Content-Type": "application-json",
			},
			body: JSON.stringify({
				username: usernameInput,
				password: passwordInput,
				email: emailInput,
			}),
		});
		const data = await postRes.json();
		console.log(data);
	}

	function handleAccountDropdownVisibility() {
		if (toolsCtx.dropdownOpen === "accountDropdownVisible") {
			toolsCtx.setDropdownOpen("");
		} else {
			toolsCtx.setDropdownOpen("accountDropdownVisible");
		}
	}

	return (
		<div className={styles.accountControlDiv}>
			<Image
				src={accountIcon}
				alt="Account Icon"
				width={48}
				height={48}
				onClick={handleAccountDropdownVisibility}
			/>
			{toolsCtx.dropdownOpen === "accountDropdownVisible" && (
				<div className={styles.dropdownDiv}>
					{signUpFormVisible && !session && (
						<div className={styles.signupDiv}>
							<div className={styles.signupRow}>
								<span>Username</span>
								<input
									value={usernameInput}
									onChange={(e) => setUsernameInput(e.target.value)}
								/>
							</div>
							<div className={styles.signupRow}>
								<span>Password</span>
								<input
									value={passwordInput}
									onChange={(e) => setPasswordInput(e.target.value)}
								/>
							</div>
							<div className={styles.signupRow}>
								<span>Email</span>
								<input
									value={emailInput}
									onChange={(e) => setEmailInput(e.target.value)}
								/>
							</div>
							<Button onClick={sendSignupPOST}>Sign up!</Button>
							<Button onClick={() => setSignUpFormVisible(false)}>Back</Button>
						</div>
					)}
					{!signUpFormVisible && (
						<>
							{session ? (
								<>
									Signed in as {session.user.username} <br />
									<Button onClick={() => signOut()}>Sign out</Button>
								</>
							) : (
								<>
									<Button onClick={() => signIn()}>Sign in</Button>
									<Button onClick={() => setSignUpFormVisible(true)}>
										Sign Up
									</Button>
								</>
							)}
						</>
					)}
				</div>
			)}
		</div>
	);
}
