import React from "react";

import { getSession } from "next-auth/react";

function HandleNewsletterRoute() {
	return <div>HandleNewsletterRoute</div>;
}

export default HandleNewsletterRoute;

export async function getServerSideProps(context) {
	const session = await getSession({ req: context.req });

	if (!session) {
		return {
			redirect: {
				destination: "/about-us",
				permanent: false,
			},
		};
	}

	return {
		props: { data: null },
	};
}
