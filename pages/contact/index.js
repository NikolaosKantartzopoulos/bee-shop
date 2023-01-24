import Button from "../../components/UI/Button";

import React, { useRef, useState } from "react";

import styles from "./Contact.module.css";

function Contact() {
	const newsletterInput = useRef();
	const commentsInput = useRef();
	const [subscriptionItems, setSubscritionItems] = useState([]);

	function newsletterHandler(event) {
		event.preventDefault();
		const item = {
			email: newsletterInput.current.value,
			comments: commentsInput.current.value,
		};
		fetch("/api/subscribe", {
			method: "POST",
			body: JSON.stringify(item),
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then((res) => res.json())
			.then((data) => console.log(data));
	}

	function getEmailsFromNewsletter() {
		fetch("/api/subscribe")
			.then((res) => {
				return res.json();
			})
			.then((data) => setSubscritionItems(data.subscriptions));
	}

	const items = (
		<ul>
			{subscriptionItems.map((item) => (
				<li>{item.email}</li>
			))}
		</ul>
	);

	return (
		<>
			<form
				className={styles.newsletterInputSection}
				onSubmit={newsletterHandler}
			>
				<div>
					<span>E-mail</span>
					<input type="email" ref={newsletterInput} />
				</div>
				<div>
					<span>Comments</span>
					<textarea rows={5} ref={commentsInput} />
				</div>
				<Button type="submit">Subscribe!</Button>
				<Button type="Button" onClick={getEmailsFromNewsletter}>
					Get emails!
				</Button>
			</form>
			{items}
			<div id="contactPage" clasName={styles.contactPage}>
				<h1 id="contactHeader" className={styles.header}>
					Have a question?
				</h1>
				<div id="contactBody" className={styles.contactBody}>
					<div id="forCustomers" className={styles.forCustomers}>
						<div id="forCustomersShopLink" className={styles.shopLink}>
							Catalog
						</div>
						<div id="forCustomersBlahBlah" className={styles.blahblah}>
							Dear customers of Melefsis shop if you have any questions about
							our products or company do not hesitate to contact with us by
							email or telephone. We would love to help you.
						</div>
					</div>
					<div id="infoAndSchedule" className={styles.infoAndSchedule}>
						<div id="contactInfo" className={styles.contactInfo}>
							<h3>CONTACT ME</h3>
							<div>
								<p>Tel: 0032106561501</p>
								<p>Email: sales@melefsis.com</p>
								<p>Adress: 25is Martiou 1 Papagou</p>
							</div>
						</div>
						<div id="schedule" className={styles.schedule}>
							<h3>OPENING HOURS</h3>
							<div>
								<p>MONDAY: 10:00-14:00 </p>
								<p>TUESDAY:CLOSED </p>
								<p>WEDNESDAY:CLOSED</p>
								<p>THURSDAY:10:00-14:00 </p>
								<p>FRIDAY:10:00-14:00 </p>
								<p>SATURDAY:CLOSED</p>
								<p>SUNDAY:CLOSED</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default Contact;
