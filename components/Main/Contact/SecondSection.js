import React, { useContext, useState } from "react";

import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";

import ToolsContext from "../../../data/context/tools-context";

import styles from "./SecondSection.module.css";
import LoadingSpinner from "../../UI/LoadingSpinner";
import { useRouter } from "next/router";

function SecondSection() {
	const router = useRouter();
	const { data: session } = useSession();

	const toolsCtx = useContext(ToolsContext);

	const [subscribedAtNewsletter, setSubscribedAtNewsletter] = useState(
		session && session.user.subscribedAtNewsletter
	);
	const [isLoading, setIsLoading] = useState();

	async function handleNewsletterClick() {
		console.log(session.user);
		try {
			if (session.user.subscribedAtNewsletter) {
				setIsLoading(true);
				const unsubscribeRes = await fetch("/api/admin/unsubscribe", {
					method: "PUT",
					headers: { "Content-Type": "text-plain" },
					body: session.user._id,
				});
				if (unsubscribeRes.ok) {
					const unsubscribeData = await unsubscribeRes.json();
					setSubscribedAtNewsletter(false);
					toolsCtx.setInfo(unsubscribeData);
				}
			} else {
				setIsLoading(true);
				const subscribeRes = await fetch("/api/admin/subscribe", {
					method: "POST",
					headers: { "Content-Type": "text-plain" },
					body: session.user._id,
				});
				if (subscribeRes.ok) {
					const subscribeData = await subscribeRes.json();
					console.log(subscribeData);
					setSubscribedAtNewsletter(true);
					toolsCtx.setInfo(subscribeData);
				}
			}
		} finally {
			setTimeout(() => {
				signOut();
				setIsLoading(false);
				router.reload();
			}, 2000);
		}
	}

	return (
		<section className={styles.secondPart}>
			<h1>Info</h1>
			<div className={styles.bodyPart}>
				<div className={styles.contactInfo}>
					<p>Email: bee-shop@mail.com</p>
					<p>tel: +123 345 5678</p>
					<address>Country, City, Some street No 4 </address>
				</div>
				{session && (
					<>
						{isLoading ? (
							<LoadingSpinner />
						) : (
							<div className={styles.newsletterDiv}>
								<label htmlFor="subscribeAtNewsletter">
									Subscribed to our Newsletter!
								</label>
								<input
									type="checkbox"
									id="subscribeAtNewsletter"
									value={session.user.subscribedAtNewsletter}
									checked={session.user.subscribedAtNewsletter}
									onChange={handleNewsletterClick}
								/>
							</div>
						)}
					</>
				)}
			</div>
		</section>
	);
}

export default SecondSection;
