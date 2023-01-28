export default function Home(props) {
	return <h1></h1>;
}
export async function getServerSideProps() {
	return {
		props: {},
		redirect: {
			destination: "/about-us",
			permanent: false,
		},
	};
}
