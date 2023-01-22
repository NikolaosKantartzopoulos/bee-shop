import React from "react";

function index({ props }) {
	return <div>index</div>;
}

export default index;

export const getServerSideProps = async (ctx) => {
	return {
		props: {},
		redirect: {
			permanent: false,
			destination: "/admin/add-product",
		},
	};
};
