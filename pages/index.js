import Link from "next/link";
import { Router, useRouter } from "next/router";
import { useEffect } from "react";

export default function Home() {
	const router = useRouter();
	useEffect(() => {
		router.push("/shop");
	}, []);

	return (
		<h1>
			Index
			<Link href="/about">About</Link>
		</h1>
	);
}
