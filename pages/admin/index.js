import React from "react";

import { getSession } from "next-auth/react";

function index({ props }) {
	return <div>index</div>;
}

export default index;

export const getServerSideProps = async (ctx) => {
	const session = await getSession({ req: ctx.req });

	if (!session) {
		return {
			redirect: {
				destination: "/about-us",
				permanent: false,
			},
		};
	}

	return {
		props: {},
		redirect: {
			permanent: false,
			destination: "/admin/add-product",
		},
	};
};
