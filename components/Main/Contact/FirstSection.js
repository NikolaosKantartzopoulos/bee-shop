import React, { useContext, useState } from "react";

import { useSession } from "next-auth/react";

import ToolsContext from "../../../data/context/tools-context";

import InputAndLabel from "../../Helper/InputAndLabel";

import styles from "./SecondSection.module.css";
import Button from "../../UI/Button";

function FirstSection() {
	const { data: session } = useSession();

	const toolsCtx = useContext(ToolsContext);

	const [email, setEmail] = useState("");
	const [fullname, setFullname] = useState("");
	const [title, setTitle] = useState("");
	const [subject, setSubject] = useState("");

	async function submitComment() {
		console.log(session.user);
		console.log(subject);
		if (session) {
			setFullname(session.user.username);
			setEmail(session.user.email);
		}

		let body = { fullname, title, email, subject };

		const res = await fetch("/api/admin/submit-comment", {
			method: "POST",
			headers: {
				"Content-Type": "application-json",
			},
			body: JSON.stringify(body),
		});
		if (res.ok) {
			const data = await res.json();
			toolsCtx.setInfo(data);
		}
	}

	return (
		<section className={styles.firstPart}>
			<h1>Contact us!</h1>
			<div className={styles.bodyPart}>
				<h2>Tell us about your experience with our services and products!</h2>
				{session ? (
					<>
						<h3>
							<em>Welcome, {session.user.username}!</em>
						</h3>
						<h3>
							<em>It is so nice to see you again!</em>
						</h3>
					</>
				) : (
					<>
						<InputAndLabel
							label="Fullname"
							value={fullname}
							setValue={setFullname}
						/>
						<InputAndLabel label="Email" value={email} setValue={setEmail} />
						<InputAndLabel label="Title" value={title} setValue={setTitle} />
					</>
				)}
				<div className={styles.subjectDiv}>
					{session && (
						<>
							<h4>Title</h4>
							<input
								value={title}
								onChange={(e) => setTitle(e.target.value)}
								style={{ width: "100%" }}
							/>
						</>
					)}
					<h4>
						<label htmlFor="subject">Subject</label>
					</h4>

					<textarea
						id="subject"
						cols={35}
						rows={10}
						value={subject}
						onChange={(e) => setSubject(e.target.value)}
					/>
					<Button onClick={submitComment}>Submit comments</Button>
				</div>
			</div>
		</section>
	);
}

export default FirstSection;
