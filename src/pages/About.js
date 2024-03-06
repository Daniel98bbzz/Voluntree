// pages/about.js
import Head from "next/head";
import Header from "../../public/Components/Header";
import Footer from "../../public/Components/Footer";
import { useState } from "react";
import Link from "next/link";
import styles from '../styles/About.module.css'; 

const About = () => {
    return (
      <div className={styles.aboutContainer}>
        <div className={styles.heroSection}>
          <h1 className={styles.heroTitle}>About Voluntree</h1>
        </div>
        <div className={styles.contentWrapper}>
          <div className={styles.contentSection}>
          <h2 className={styles.whatIsTitle}>
              Join us </h2>
            <p className={styles.introText}>
             students, families, or solo adventurers
             and plant seeds of change in Israel's rich soil. Dive into diverse agricultural projects and grow with us.
            </p>
            <h2 className={styles.whatIsTitle}>What is Voluntree?</h2>
            <p>Voluntree designed to seamlessly connect the vibrant agricultural sector with community volunteers. Our digital platform is a conduit for mutual growth, powered by innovative technology.</p>
            <p>We aim to nourish the bond between Israeli farmers and society.</p>
            <p>Voluntree uses advanced algorithms and big data to streamline the volunteering process, ensuring every hand contributes meaningfully.</p>
            <h4>Embrace the land. Empower the farmer. Enrich your life. Voluntree—where technology meets tradition.</h4>
          </div>
        </div>
      </div>
    );
};

export default About;