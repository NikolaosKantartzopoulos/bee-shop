export default function Home() {
	return <h1></h1>;
}
async function getServerSideProps() {
	return {
		props: {},
		redirect: {
			destination: "/shop",
			permanent: false,
		},
	};
}
