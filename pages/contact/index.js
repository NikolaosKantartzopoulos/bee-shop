import React, { useState } from "react";

import Image from "next/image";

import supportBG from "../../public/assets/images/supportBG.jpg";

import styles from "../../components/Helper/pages-css/contact-router-index.module.css";
import { useSession } from "next-auth/react";
import InputAndLabel from "../../components/Helper/InputAndLabel";

function ContactRouterIndex() {
	const { data: session } = useSession();

	const [subscribedAtNewsletter, setSubscribedAtNewsletter] = useState(
		session ? session.user.subscribedAtNewsletter : false
	);

	const [email, setEmail] = useState("");
	const [fullname, setFullname] = useState("");
	const [title, setTitle] = useState("");
	const [subject, setSubject] = useState("");

	async function handleNewsletterClick() {
		console.log(session.user);
	}

	return (
		<div className={styles.ContactRouterIndexDiv}>
			<Image
				src={supportBG}
				alt="Bee hive"
				fill
				priority
				style={{ opacity: 0.4, zIndex: -1 }}
			/>
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
							<label htlFor="subject">Subject</label>
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
			<section className={styles.secondPart}>
				<h1>Info</h1>
				<div className={styles.bodyPart}>
					<div className={styles.contactInfo}>
						<p>Email: bee-shop@mail.com</p>
						<p>tel: +123 345 5678</p>
						<address>Country, City, Some street No 4 </address>
					</div>
					{session && (
						<div className={styles.newsletterDiv}>
							<label htmlFor="subscribeAtNewsletter">
								Subscribe to our Newsletter!
							</label>
							<input
								type="checkbox"
								id="subscribeAtNewsletter"
								value={true}
								checked={subscribedAtNewsletter}
								onChange={(e) => handleNewsletterClick}
							/>
						</div>
					)}
				</div>
			</section>
		</div>
	);
}

export default ContactRouterIndex;
