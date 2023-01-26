import React from "react";

import Image from "next/image";

import beekeeperImage from "/public/assets/images/beekeeper.jpg";
import aboutImage from "/public/assets/images/bee2BG.jpg";

import styles from "./AboutUs.module.css";

function AboutUS() {
	return (
		<div className={styles.aboutUsSection}>
			<Image
				src={aboutImage}
				alt="Bee!"
				className={styles.bgImage}
				fill
				priority
			/>
			<div id="twoWords" className={styles.twoWords}>
				<div id="profile" className={styles.profile}>
					<h3>PROFILE</h3>
					<span>
						Melefsis is a family run nomadic beekeeping company. It was founded
						in 2013 by Petros Iliadis, driven by his interest in a more natural
						way of living, away from the city’s hectic life. Beekeeping started
						as a hobby for him, but fascinated by the world of bees, he quickly
						developed it to a full time occupation. In 2015 Adam Cosgrove joined
						the family and the bees. Coming from the Yacht industry, he fell in
						love with the bees and exported our honey in UK. Elia Iliadi with
						her graphic & design knowledge created company ID. Petros made his
						own Youtube channel to help other beekeepers who just started their
						beautiful journey. Today he has over 18.000 beekeepers followers
						driven by the same passion and love for bees. As he says "together
						we're gonna build and change beekeepers community in Greece{" "}
					</span>
				</div>
				<div id="ourMission" className={styles.ourMission}>
					<h3>OUR MISSION</h3>
					<span>
						Our mission is the collection of high quality raw honey with the
						particular characteristics of each location’s plant life. Honey,
						like wine, varies from season to season and is totally depended on
						nature’s changes. Therefore we aim to supply our customers with a
						unique artisan product in every crop.We are also dedicated to the
						distribution of all bee products (bee pollen, wax, propolis & royal
						jelly) in a processed or raw form.
					</span>
				</div>
			</div>
			<div id="theBeekeeper" className={styles.smallBio}>
				<Image
					className={styles.beekeeperImage}
					src={beekeeperImage}
					width={150}
					height={150}
					alt="beekeeper image"
				></Image>
				<div id="beekeeperSomeWords" className={styles.someWords}>
					<h3>Me my self & I - the Beekeeper</h3>
					<span>
						Our goal is to provide to our customers the finest quality of honey
						and bee products. Watch out ! you can get yourself addicted..
					</span>
				</div>
			</div>
		</div>
	);
}

export default AboutUS;
