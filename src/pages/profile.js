import Head from "next/head";
import Header from "../../public/Components/Header";
import Footer from "../../public/Components/Footer";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import jwt from "jsonwebtoken";
import Image from "next/image";

export async function getServerSideProps(context) {
  const { req } = context;

  try {
    const jwtSession = req.cookies.jwtSession;
    const userSession = jwt.decode(jwtSession);

    const userData = JSON.stringify(userSession);

    if (userData == "null") {
      return {
        redirect: {
          destination: "/login",
          permanent: false,
        },
      };
    }
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

export default function Login({ user }) {
  let userData;
  try {
    userData = JSON.parse(user);
  } catch (error) {}

  const router = useRouter();

  const logOut = async () => {
    const res = await fetch("/api/users/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    console.log(data);

    if (data.message) router.push("/login");
  };

  console.log(userData);
  return (
    <>
      <Head>
        <title>Profile</title>
        <meta name="description" content="Generated by react" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Header />

        <div style={{ margin: "100px auto", textAlign: "center" }} className="">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="#3A8D2D"
            width={100}
          >
            <path
              fillRule="evenodd"
              d="M18.685 19.097A9.723 9.723 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 0 0 3.065 7.097A9.716 9.716 0 0 0 12 21.75a9.716 9.716 0 0 0 6.685-2.653Zm-12.54-1.285A7.486 7.486 0 0 1 12 15a7.486 7.486 0 0 1 5.855 2.812A8.224 8.224 0 0 1 12 20.25a8.224 8.224 0 0 1-5.855-2.438ZM15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
              clipRule="evenodd"
            />
          </svg>

          <div className="profile-page">
            <h2 style={{ margin: 5 }}>{userData.username}</h2>
            <p
              style={{
                textTransform: "capitalize",
                fontSize: 15,
                marginTop: 0,
              }}
            >
              {userData.role}
            </p>
          </div>

          <div className="profile-wrap">
            <p className="profile-wrap-title">Email:</p>
            <p>{userData.email}</p>
          </div>

          <div className="profile-wrap">
            <p className="profile-wrap-title">ID:</p>
            <p>{userData.u_id ?? "No ID provided"}</p>
          </div>

          {userData.role == "volunteer" && (
            <Link passHref href={"/favorites"} className="profile-flex">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                style={{ marginBottom: 2, marginLeft: 1.25 }}
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect width="24" height="24" fill="white" />
                <path
                  d="M21 8.99998C21 12.7539 15.7156 17.9757 12.5857 20.5327C12.2416 20.8137 11.7516 20.8225 11.399 20.5523C8.26723 18.1523 3 13.1225 3 8.99998C3 2.00001 12 2.00002 12 8C12 2.00001 21 1.99999 21 8.99998Z"
                  stroke="#000000"
                  strokeLinecap="round"
                  strokeWidth={1.5}
                  strokeLinejoin="round"
                />
              </svg>
              <p className="">Favorites</p>
            </Link>
          )}

          {userData.role == "farmer" && (
            <Link passHref href={"/my-opportunities"} className="profile-flex">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                style={{ marginBottom: 2, marginLeft: 0 }}
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect width="24" height="24" fill="white" />
                <path
                  d="M21 8.99998C21 12.7539 15.7156 17.9757 12.5857 20.5327C12.2416 20.8137 11.7516 20.8225 11.399 20.5523C8.26723 18.1523 3 13.1225 3 8.99998C3 2.00001 12 2.00002 12 8C12 2.00001 21 1.99999 21 8.99998Z"
                  stroke="#000000"
                  strokeLinecap="round"
                  strokeWidth={1.5}
                  strokeLinejoin="round"
                />
              </svg>
              <p className="">My Opportunities</p>
            </Link>
          )}

          <Link passHref href={"/applications"} className="profile-flex">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              style={{
                marginBottom: 2,
                marginRight: 0,
                transform: "scale(0.95)",
              }}
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width="24" height="24" fill="white" />
              <path
                d="M12 6.90909C10.8999 5.50893 9.20406 4.10877 5.00119 4.00602C4.72513 3.99928 4.5 4.22351 4.5 4.49965C4.5 6.54813 4.5 14.3034 4.5 16.597C4.5 16.8731 4.72515 17.09 5.00114 17.099C9.20405 17.2364 10.8999 19.0998 12 20.5M12 6.90909C13.1001 5.50893 14.7959 4.10877 18.9988 4.00602C19.2749 3.99928 19.5 4.21847 19.5 4.49461C19.5 6.78447 19.5 14.3064 19.5 16.5963C19.5 16.8724 19.2749 17.09 18.9989 17.099C14.796 17.2364 13.1001 19.0998 12 20.5M12 6.90909L12 20.5"
                stroke="#000000"
                strokeLinecap="round"
                strokeWidth={1.4}
                strokeLinejoin="round"
              />
              <path
                d="M19.2353 6H21.5C21.7761 6 22 6.22386 22 6.5V19.539C22 19.9436 21.5233 20.2124 21.1535 20.0481C20.3584 19.6948 19.0315 19.2632 17.2941 19.2632C14.3529 19.2632 12 21 12 21C12 21 9.64706 19.2632 6.70588 19.2632C4.96845 19.2632 3.64156 19.6948 2.84647 20.0481C2.47668 20.2124 2 19.9436 2 19.539V6.5C2 6.22386 2.22386 6 2.5 6H4.76471"
                stroke="#000000"
                strokeLinejoin="round"
                strokeWidth={1.4}
              />
            </svg>
            <p className="">Applications</p>
          </Link>

          <button className="logout-button" onClick={() => logOut()}>
            Log Out
          </button>
        </div>
        <Footer volunteer={userData && userData.role == "volunteer"} />
      </main>
    </>
  );
}
