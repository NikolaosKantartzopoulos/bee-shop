import React from "react";
import { getSession } from "next-auth/react";

import AddProductForm from "../../components/Main/admin/add-product/AddProductForm";

function AddProduct() {
	return (
		<div>
			<AddProductForm />
		</div>
	);
}

export default AddProduct;

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
		props: {
			data: null,
		},
	};
};
