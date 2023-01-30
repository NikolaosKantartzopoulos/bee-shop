import React, { useContext, useState } from "react";

import { useSession } from "next-auth/react";

import ToolsContext from "../../../data/context/tools-context";

import InputAndLabel from "../../Helper/InputAndLabel";

import styles from "./SecondSection.module.css";

function FirstSection() {
	const { data: session } = useSession();

	const toolsCtx = useContext(ToolsContext);

	const [email, setEmail] = useState("");
	const [fullname, setFullname] = useState("");
	const [title, setTitle] = useState("");
	const [subject, setSubject] = useState("");

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
					<h4>
						<label htmlFor="subject">Subject</label>
					</h4>
					<textarea
						id="subject"
						cols={35}
						rows={10}
						value={subject}
						onChange={(e) => setSubject(e.target.fullname)}
					/>
				</div>
			</div>
		</section>
	);
}

export default FirstSection;
