import Head from "next/head";
import Header from "../../../public/Components/Header";
import Footer from "../../../public/Components/Footer";
import { useState } from "react";

export default function AddOpportunity() {
  const [formData, setFormData] = useState({
    title: "",
    location: "",
    description: "",
    header_image: "",
    rating_score: "",
    total_reviews: "",
    price_per_week: "",
    currency: "",
    duration_min: "",
    duration_max: "",
    minimum_age: "",
    services: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(formData);
  };

  return (
    <>
      <Head>
        <title>Add Volunteer Opportunity</title>
        <meta name="description" content="Generated by react" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Header />

        <div style={{ margin: "0px 10px" }}>
          <form
            id="addOpportunityForm"
            className="opportunity-form"
            onSubmit={handleSubmit}
          >
            <h2>Add New Opportunity</h2>
            <input
              type="text"
              name="title"
              placeholder="Title"
              required
              className="form-input"
              onChange={handleChange}
            />
            <input
              type="text"
              name="location"
              placeholder="Location"
              required
              className="form-input"
              onChange={handleChange}
            />
            <textarea
              name="description"
              placeholder="Description"
              required
              className="form-input"
              onChange={handleChange}
            ></textarea>
            <input
              type="text"
              name="header_image"
              placeholder="Header Image URL"
              required
              className="form-input"
              onChange={handleChange}
            />
            <input
              type="number"
              name="rating_score"
              placeholder="Rating Score"
              required
              className="form-input"
              onChange={handleChange}
            />
            <input
              type="number"
              name="total_reviews"
              placeholder="Total Reviews"
              required
              className="form-input"
              onChange={handleChange}
            />
            <input
              type="number"
              name="price_per_week"
              placeholder="Price per Week"
              required
              className="form-input"
              onChange={handleChange}
            />
            <input
              type="text"
              name="currency"
              placeholder="Currency"
              required
              className="form-input"
              onChange={handleChange}
            />
            <input
              type="number"
              name="duration_min"
              placeholder="Minimum Duration (weeks)"
              required
              className="form-input"
              onChange={handleChange}
            />
            <input
              type="number"
              name="duration_max"
              placeholder="Maximum Duration (weeks)"
              required
              className="form-input"
              onChange={handleChange}
            />
            <input
              type="number"
              name="minimum_age"
              placeholder="Minimum Age"
              required
              className="form-input"
              onChange={handleChange}
            />
            <input
              type="text"
              name="services"
              placeholder="Services (comma-separated)"
              required
              className="form-input"
              onChange={handleChange}
            />
            <button type="submit" className="submit-button">
              Add Opportunity
            </button>
          </form>
        </div>

        <Footer />
      </main>
    </>
  );
}
