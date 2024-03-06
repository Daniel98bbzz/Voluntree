import Head from "next/head";
import Header from "../../public/Components/Header";
import Footer from "../../public/Components/Footer";
import { useState } from "react";
import Link from "next/link";
<<<<<<< HEAD
import { useRouter } from "next/router";
=======
>>>>>>> d04a06fe193db3ea6c8dd665e264f1bab460ebbe

export default function Register() {
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

<<<<<<< HEAD
  const route = useRouter();

=======
>>>>>>> d04a06fe193db3ea6c8dd665e264f1bab460ebbe
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
<<<<<<< HEAD

    const createUser = async () => {
      const res = await fetch("/api/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...formData, role: "farmer" }),
      });

      if (!res.ok) {
        // console.log(await res.json());
      }

      const responseData = await res.json();
      if (responseData.data) {
        route.push("/login");
      }
    };

    if (
      formData.username &&
      formData.email &&
      formData.password == formData.confirmPassword
    )
      createUser();
=======
    // Add logic to submit the form data to the backend
    console.log(formData);
>>>>>>> d04a06fe193db3ea6c8dd665e264f1bab460ebbe
  };
  return (
    <>
      <Head>
        <title>Register</title>
        <meta name="description" content="Generated by react" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Header />

        <div className="container-register">
          <h2>Register</h2>
          <form id="registerForm" onSubmit={handleSubmit}>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Email"
              required
              value={formData.email}
              onChange={handleChange}
            />
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Username"
              required
              value={formData.username}
              onChange={handleChange}
            />
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Password"
              required
              value={formData.password}
              onChange={handleChange}
            />
            <input
              type="password"
              id="passwordConf"
              name="confirmPassword"
              placeholder="Confirm Password"
              required
              value={formData.confirmPassword}
              onChange={handleChange}
            />
<<<<<<< HEAD

=======
>>>>>>> d04a06fe193db3ea6c8dd665e264f1bab460ebbe
            <input type="submit" value="Register" />
          </form>
          <p>
            Already have an account? <Link href="/login">Login here</Link>
          </p>
        </div>
        <Footer />
      </main>
    </>
  );
}
