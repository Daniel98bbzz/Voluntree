/* eslint-disable @next/next/no-img-element */
import Head from "next/head";
import Image from "next/image";

import Header from "../../public/Components/Header";
import Footer from "../../public/Components/Footer";

import opportunityModel from "../../models/opportunityModel";
import mongoose from "mongoose";
import Link from "next/link";
import { useRef, useState } from "react";
import jwt from "jsonwebtoken";
import toast from "react-hot-toast";
import { useRouter } from "next/router";

export async function getServerSideProps(context) {
  const { req } = context;

  const protocol = req.headers.referer
    ? req.headers.referer.split(":")[0]
    : "http";
  const host = req.headers.host;

  const hostUrl = `${protocol}://${host}`;

  try {
    let client = await mongoose.connect(process.env.DATABASE_URL);
    const opportunities = await opportunityModel.find();

    const jwtSession = req.cookies.jwtSession;
    const userSession = jwt.decode(jwtSession);

    const userData = JSON.stringify(userSession);

    if (userData.length > 10) {
      try {
        const res = await fetch(
          `${hostUrl}/api/favorites?user_id=${userSession.id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const favsData = await res.json();
        return {
          props: {
            data: JSON.stringify(opportunities),
            user: JSON.stringify(userSession) || "null",
            favoritesData: JSON.stringify(favsData) || [],
          },
        };
      } catch (error) {
        return {
          props: {
            data: JSON.stringify(opportunities),
            user: JSON.stringify(userSession) || "null",
            favoritesData: [],
          },
        };
      }
    } else {
      return {
        props: {
          data: JSON.stringify(opportunities),
          user: JSON.stringify(userSession) || "null",
          favoritesData: [],
        },
      };
    }
  } catch (error) {
    return {
      props: { data: "Error", user: "null", favoritesData: [] },
    };
  }
}

export default function Home({ data, user, favoritesData }) {
  const opportunities = data != "Error" ? JSON.parse(data) : "";

  let userData;
  let favorites;

  const { query } = useRouter();
  const region = query.region ? decodeURIComponent(query.region) : "";

  try {
    userData = JSON.parse(user);
    favorites = JSON.parse(favoritesData).userFavoritesData;
  } catch (error) {}

  const [userFavorites, setUserFavorites] = useState(favorites || []);

  const [openFilter, setOpenFilter] = useState(false);
  const [filter, setFilter] = useState({
    sort: 0,
    search: "",
  });

  let filteredOpportunities;
  if (opportunities.length != 0) {
    filteredOpportunities = opportunities
      .filter((opp) =>
        opp.title
          .toLocaleLowerCase()
          .includes(filter.search.toLocaleLowerCase())
      )
      .filter((opp) =>
        opp.location_details.address
          .toLocaleLowerCase()
          .includes(region.toLocaleLowerCase())
      )
      .sort((a, b) => {
        if (filter.sort != 3) return 0;
        const priceA = a.cost ? a.cost.price_per_week : 0;
        const priceB = b.cost ? b.cost.price_per_week : 0;

        return priceB - priceA;
      })
      .sort((a, b) => {
        if (filter.sort != 2) return 0;

        const scoreA = a.rating ? a.rating.score : 0;
        const scoreB = b.rating ? b.rating.score : 0;

        return scoreB - scoreA;
      });
  }

  const FilterModal = useRef(null);

  async function addFavoriteOpportunity(fd) {
    try {
      const res = await fetch("/api/favorite", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(fd),
      });
      if (!res.ok) {
        throw new Error();
      }
      const responseData = await res.json();
    } catch (error) {
      throw new Error(error);
    }
  }

  function addFavoriteOpportunityButton(fd) {
    toast.promise(addFavoriteOpportunity(fd), {
      loading: "Loading...",
      success: () => {
        return "Saved Successfully";
      },
      error: "Error, Try Again",
    });
  }

  //
  async function removeFavoriteOpportunity(fd) {
    try {
      const res = await fetch("/api/favorite", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(fd),
      });

      if (!res.ok) {
        throw new Error();
      }

      const responseData = await res.json();
    } catch (error) {
      throw new Error(error);
    }
  }
  function removeFavoriteOpportunityButton(fd) {
    toast.promise(removeFavoriteOpportunity(fd), {
      loading: "Loading...",
      success: () => {
        return "Removed Successfully";
      },
      error: "Error, Try Again",
    });
  }

  return (
    <>
      <Head>
        <title>Opportunity</title>
        <meta name="description" content="Generated by react" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Header />
        <div style={{ marginTop: 90 }} className="header-filter">
          <div className="search-filter">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              width={21}
              style={{ transform: "translateY(-1px)" }}
              xmlns="http://www.w3.org/2000/svg"
              strokeWidth={0.25}
              stroke="rgb(117,117,117)"
            >
              <g strokeWidth="0"></g>
              <g strokeLinecap="round" strokeLinejoin="round"></g>
              <g>
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M15 10.5C15 12.9853 12.9853 15 10.5 15C8.01472 15 6 12.9853 6 10.5C6 8.01472 8.01472 6 10.5 6C12.9853 6 15 8.01472 15 10.5ZM14.1793 15.2399C13.1632 16.0297 11.8865 16.5 10.5 16.5C7.18629 16.5 4.5 13.8137 4.5 10.5C4.5 7.18629 7.18629 4.5 10.5 4.5C13.8137 4.5 16.5 7.18629 16.5 10.5C16.5 11.8865 16.0297 13.1632 15.2399 14.1792L20.0304 18.9697L18.9697 20.0303L14.1793 15.2399Z"
                  fill="rgb(117,117,117)"
                ></path>{" "}
              </g>
            </svg>
            <input
              type="search"
              placeholder="Search..."
              value={filter.search}
              onChange={(e) => setFilter({ ...filter, search: e.target.value })}
            />
          </div>

          <button className="" onClick={() => setOpenFilter(true)}>
            <svg
              viewBox="0 0 24 24"
              fill="none"
              width={24}
              xmlns="http://www.w3.org/2000/svg"
            >
              <g strokeWidth="0"></g>
              <g strokeLinecap="round" strokeLinejoin="round"></g>
              <g id="SVGRepo_iconCarrier">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M3 7C3 6.44772 3.44772 6 4 6H20C20.5523 6 21 6.44772 21 7C21 7.55228 20.5523 8 20 8H4C3.44772 8 3 7.55228 3 7ZM6 12C6 11.4477 6.44772 11 7 11H17C17.5523 11 18 11.4477 18 12C18 12.5523 17.5523 13 17 13H7C6.44772 13 6 12.5523 6 12ZM9 17C9 16.4477 9.44772 16 10 16H14C14.5523 16 15 16.4477 15 17C15 17.5523 14.5523 18 14 18H10C9.44772 18 9 17.5523 9 17Z"
                  fill="#000000"
                ></path>{" "}
              </g>
            </svg>
          </button>
        </div>

        <div style={{ marginBottom: 80 }} className="wrapper">
          {filteredOpportunities && filteredOpportunities.length > 0 ? (
            filteredOpportunities.map((opportunity, i) => {
              const totalRatings = opportunity.overview.reviews.length;
              const sumRatings = opportunity.overview.reviews.reduce(
                (sum, review) => {
                  return sum + parseFloat(review.rating);
                },
                0
              );

              const avgRatings =
                totalRatings > 0
                  ? (sumRatings / totalRatings).toFixed(1)
                  : "N/A";

              const isFavorite = userFavorites.some(
                (favorite) => favorite.opportunity_id === opportunity._id
              );

              return (
                <article key={i} className="volunteer-card">
                  <header className="volunteer-card-header">
                    <img
                      src={getImageSrc(opportunity.header_image)}
                      alt="Beach with turtle"
                      className="volunteer-header-image"
                    />
                    <button
                      onClick={() => {
                        if (isFavorite) {
                          const updatedFavorites = userFavorites.filter(
                            (favorite) =>
                              favorite.opportunity_id !== opportunity._id
                          );
                          setUserFavorites(updatedFavorites);

                          const fd = {
                            volunteer_id: userData.id,
                            opportunity_id: opportunity._id,
                          };

                          removeFavoriteOpportunityButton(fd);
                        } else {
                          setUserFavorites([
                            ...userFavorites,
                            { opportunity_id: opportunity._id },
                          ]);

                          const fd = {
                            volunteer_id: userData.id,
                            title: opportunity.title,
                            opportunity_id: opportunity._id,
                          };

                          addFavoriteOpportunityButton(fd);
                        }
                      }}
                      className={
                        isFavorite ? "heart-button-fill" : "heart-button"
                      }
                    >
                      ♥
                    </button>
                    {opportunity.high_demand && (
                      <div className="badge high-demand">In High Demand</div>
                    )}

                    <div className="badge location">{opportunity.location}</div>
                  </header>
                  <div className="volunteer-content">
                    <h2 className="volunteer-title">{opportunity.title}</h2>
                    <div className="volunteer-rating">
                      <span className="rating">{avgRatings}</span>
                      <img
                        className="star"
                        src="/Images/svgs/star.svg"
                        alt="Star"
                      />
                      <span className="total-ratings">({totalRatings})</span>
                    </div>
                    <div className="volunteer-info">
                      {/* <span className="volunteer-price">
                        {opportunity.cost.price_per_week}
                        {opportunity.cost.currency} per week
                      </span> */}
                      <span className="volunteer-duration">
                        {opportunity.cost.duration_weeks.min} -{" "}
                        {opportunity.cost.duration_weeks.max} weeks
                      </span>
                      <span className="volunteer-age">
                        Age {opportunity.minimum_age}+
                      </span>
                    </div>
                    <p className="volunteer-description">
                      {opportunity.description}
                    </p>
                  </div>
                  <div className="volunteer-footer">
                    <div className="volunteer-services">
                      {opportunity.services.slice(-3).map((service, index) => (
                        <div key={index} className="service">
                          <img
                            className="service-icon"
                            src={`/Images/svgs/servicesSvgs/${service.name}.svg`}
                            alt={`${service.name} Icon`}
                          />
                          <span>{service.name}</span>
                        </div>
                      ))}
                    </div>
                    <Link
                      href={`/opportunity/${opportunity._id}`}
                      className="details-button"
                    >
                      Details
                    </Link>
                  </div>
                </article>
              );
            })
          ) : (
            <div style={{ marginTop: 40, fontSize: 20 }}>No results found.</div>
          )}

          {data == "Error" && (
            <div style={{ marginTop: 40, fontSize: 20 }}>No results found.</div>
          )}

          {region.length > 1 && (
            <Link
              passHref
              className="submit-rate-button"
              href={"/opportunites"}
              style={{
                marginTop: 40,
                marginBottom: 20,
                width: "fit-content",
                fontSize: 14,
                textDecoration: "none",
              }}
            >
              Reset Location Filter
            </Link>
          )}
        </div>
      </main>

      {openFilter && (
        <div className="filter_modal">
          <div ref={FilterModal} className="modal">
            <h3>Sort By:</h3>
            <svg
              viewBox="0 0 24 24"
              fill="none"
              onClick={() => setOpenFilter(false)}
              height={17}
              strokeWidth={0.75}
              stroke="black"
              className="icon_close"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g strokeWidth="0"></g>
              <g strokeLinecap="round" strokeLinejoin="round"></g>
              <g>
                {" "}
                <path
                  d="M20.7457 3.32851C20.3552 2.93798 19.722 2.93798 19.3315 3.32851L12.0371 10.6229L4.74275 3.32851C4.35223 2.93798 3.71906 2.93798 3.32854 3.32851C2.93801 3.71903 2.93801 4.3522 3.32854 4.74272L10.6229 12.0371L3.32856 19.3314C2.93803 19.722 2.93803 20.3551 3.32856 20.7457C3.71908 21.1362 4.35225 21.1362 4.74277 20.7457L12.0371 13.4513L19.3315 20.7457C19.722 21.1362 20.3552 21.1362 20.7457 20.7457C21.1362 20.3551 21.1362 19.722 20.7457 19.3315L13.4513 12.0371L20.7457 4.74272C21.1362 4.3522 21.1362 3.71903 20.7457 3.32851Z"
                  fill="#000"
                ></path>{" "}
              </g>
            </svg>
            <ul>
              <li>
                <input
                  style={{ transform: "scale(1.2)" }}
                  type="radio"
                  id="newest"
                  checked={filter.sort == 0}
                  onChange={() => setFilter({ ...filter, sort: 0 })}
                />
                <label className="radio_filter" htmlFor="newest">
                  Newest to Oldest
                </label>
              </li>

              <li>
                <input
                  style={{ transform: "scale(1.2)" }}
                  type="radio"
                  id="oldest"
                  checked={filter.sort == 1}
                  onChange={() => setFilter({ ...filter, sort: 1 })}
                />
                <label className="radio_filter" htmlFor="oldest">
                  Oldest to Newest
                </label>
              </li>

              <li>
                <input
                  style={{ transform: "scale(1.2)" }}
                  type="radio"
                  id="rated"
                  checked={filter.sort == 2}
                  onChange={() => setFilter({ ...filter, sort: 2 })}
                />
                <label className="radio_filter" htmlFor="rated">
                  Highest Rated
                </label>
              </li>

              <li>
                <input
                  style={{ transform: "scale(1.2)" }}
                  type="radio"
                  id="price"
                  checked={filter.sort == 3}
                  onChange={() => setFilter({ ...filter, sort: 3 })}
                />
                <label className="radio_filter" htmlFor="price">
                  Price
                </label>
              </li>
            </ul>
          </div>
        </div>
      )}
      <Footer volunteer={userData && userData.role == "volunteer"} />
    </>
  );
}

function getImageSrc(headerImage) {
  // Check if headerImage starts with 'http://' or 'https://'
  if (/^https?:\/\//.test(headerImage)) {
    return headerImage;
  } else {
    return `/Images/${headerImage}`;
  }
}
