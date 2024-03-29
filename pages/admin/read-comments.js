import React from "react";
import { getSession } from "next-auth/react";

import { connectDatabase } from "../../data/databaseFunctions";

import styles from "../../components/Helper/pages-css/read-comments.module.css";

function ReadCommentsRouteIndex({ allComments }) {
	console.log(allComments);
	return (
		<div className={styles.readCommentsPage}>
			{allComments.map((c) => (
				<div key={c._id} className={styles.commentDiv}>
					<h1>{c.title}</h1>
					<div className={styles.infoDiv}>
						<p>by {c.fullname}</p>
						<p>email: {c.email}</p>
					</div>
					<div className={styles.subjectDiv}>{c.subject}</div>
				</div>
			))}
		</div>
	);
}

export default ReadCommentsRouteIndex;

export const getServerSideProps = async (context) => {
	const session = await getSession({ req: context.req });

	const [client, db] = await connectDatabase();
	const comID = await db.collection("comments").find().toArray();
	const allComments = comID.map((com) => ({ ...com, _id: com._id.toString() }));
	await client.close();

	if (!session) {
		return {
			redirect: {
				destination: "/about-us",
				permanent: false,
			},
		};
	}

	return {
		props: {
			allComments: allComments,
		},
	};
};
