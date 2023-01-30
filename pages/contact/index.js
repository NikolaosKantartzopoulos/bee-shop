import React, { useContext, useState } from "react";

import Image from "next/image";

import supportBG from "../../public/assets/images/supportBG.jpg";

import FirstSection from "../../components/Main/Contact/FirstSection";
import SecondSection from "../../components/Main/Contact/SecondSection";

import styles from "../../components/Helper/pages-css/contact-router-index.module.css";

function ContactRouterIndex() {
	return (
		<div className={styles.ContactRouterIndexDiv}>
			<Image
				src={supportBG}
				alt="Bee hive"
				fill
				priority
				style={{ opacity: 0.4, zIndex: -1 }}
			/>
			<FirstSection />
			<SecondSection />
		</div>
	);
}

export default ContactRouterIndex;
