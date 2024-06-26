import Head from "next/head";
import Header from "../../public/Components/Header";
import Footer from "../../public/Components/Footer";
import { useState } from "react";
import Link from "next/link";
import styles from "../styles/About.module.css";

import jwt from "jsonwebtoken";

export async function getServerSideProps(context) {
  const { req } = context;

  try {
    const jwtSession = req.cookies.jwtSession;
    const userSession = jwt.decode(jwtSession);

    const userData = JSON.stringify(userSession);

    return {
      props: {
        user: JSON.stringify(userSession) || "null",
      },
    };
  } catch (error) {
    return {
      props: {
        user: "null",
      },
    };
  }
}

export default function About({ user }) {
  let userData;
  try {
    userData = JSON.parse(user);
  } catch (error) {}

  return (
    <div className={styles.aboutContainer}>
      <div className={styles.heroSection}>
        <Header />
        <h1 className={styles.heroTitle}>About Voluntree</h1>
      </div>
      <div className={styles.contentWrapper}>
        <div className={styles.contentSection}>
          <h2 className={styles.whatIsTitle}>Join us </h2>
          <p className={styles.introText}>
            students, families, or solo adventurers and plant seeds of change in
            Israel&apos;s rich soil. Dive into diverse agricultural projects and
            grow with us.
          </p>
          <h2 className={styles.whatIsTitle}>What is Voluntree?</h2>
          <p>
            Voluntree designed to seamlessly connect the vibrant agricultural
            sector with community volunteers. Our digital platform is a conduit
            for mutual growth, powered by innovative technology.
          </p>
          <p>We aim to nourish the bond between Israeli farmers and society.</p>
          <p>
            Voluntree uses advanced algorithms and big data to streamline the
            volunteering process, ensuring every hand contributes meaningfully.
          </p>
          <h4>
            Embrace the land. Empower the farmer. Enrich your life.
            Voluntree—where technology meets tradition.
          </h4>
        </div>
      </div>
      <Footer volunteer={userData && userData.role == "volunteer"} />
    </div>
  );
}
