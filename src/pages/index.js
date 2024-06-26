/* eslint-disable @next/next/no-img-element */
import Head from "next/head";
import Header from "../../public/Components/Header";
import Footer from "../../public/Components/Footer";
import Link from "next/link";
import jwt from "jsonwebtoken";
import { useEffect, useState } from "react";

function getCurrentLocation() {
  return new Promise((resolve, reject) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          resolve({ lat: latitude, lng: longitude });
        },
        (error) => {
          reject(error);
        }
      );
    } else {
      reject(new Error("Geolocation is not supported by this browser."));
    }
  });
}

function calculateDistance(lat1, lng1, lat2, lng2) {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

async function sortCoordinatesByProximityWithDistance(coordinates) {
  const userLocation = await getCurrentLocation(); // Assume this function is implemented elsewhere.
  return coordinates
    .map((coordinate) => ({
      ...coordinate,
      distance: calculateDistance(
        userLocation.lat,
        userLocation.lng,
        coordinate.location_details.coordinates.lat,
        coordinate.location_details.coordinates.lng
      ), // Assume this function is implemented elsewhere.
    }))
    .sort((a, b) => a.distance - b.distance);
}

function extractLocationsWithCounts(objects) {
  const locationCounts = {};

  objects.forEach((obj) => {
    console.log(obj.location_details.address);
    const lastCommaIndex = obj.location_details.address.lastIndexOf(", ");
    const locationPart =
      lastCommaIndex !== -1
        ? obj.location_details.address.substring(lastCommaIndex + 2)
        : obj.location_details.address;

    if (!locationCounts[locationPart]) {
      locationCounts[locationPart] = 1;
    } else {
      locationCounts[locationPart]++;
    }
  });

  return Object.keys(locationCounts).map((location) => ({
    location,
    count: locationCounts[location],
  }));
}

export async function getServerSideProps(context) {
  const { req } = context;
  const protocol = req.headers.referer
    ? req.headers.referer.split(":")[0]
    : "http";
  const host = req.headers.host;

  const hostUrl = `${protocol}://${host}`;
  try {
    const res = await fetch(`${hostUrl}/api/opportunities`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const opportunities = await res.json();

    const jwtSession = req.cookies.jwtSession;
    const userSession = jwt.decode(jwtSession);

    return {
      props: {
        user: JSON.stringify(userSession) || "null",
        data: JSON.stringify(opportunities),
      },
    };
  } catch (error) {
    return {
      props: { data: "Error", user: "null" },
    };
  }
}

export default function Home({ data, user }) {
  let opportunities;
  try {
    opportunities = JSON.parse(data);
  } catch (error) {
    opportunities = "Error";
  }

  let userData;
  try {
    userData = JSON.parse(user);
  } catch (error) {}

  const [sortedOpportunities, setSortedOpportunities] = useState([]);

  useEffect(() => {
    async function sortAndSetOpportunities() {
      if (opportunities.data) {
        try {
          const sorted = await sortCoordinatesByProximityWithDistance(
            opportunities.data
          );
          setSortedOpportunities(sorted);
        } catch (error) {
          console.error(error);
          // Handle the error as needed, possibly setting an error state
        }
      }
    }

    sortAndSetOpportunities();
  }, [opportunities.data]);

  return (
    <>
      <Head>
        <title>Networks For Growing Berries</title>
        <meta name="description" content="Generated by react" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Header showBackButton={false} />

        <div style={{ marginBottom: 70 }} className="container">
          <div className="rectangle">
            <h3 style={{ letterSpacing: "0.02em" }}>More than Volunteering</h3>
            <p>Join us for meaningful volunteering</p>
            <p>
              Experiences that connect a wide variety of populations to farmers
              who need help
            </p>
            <Link href="/About" legacyBehavior>
              <a className="button">Learn More</a>
            </Link>
          </div>

          <h2 style={{ marginTop: 40 }} className="selection-heading">
            Selection By Region
          </h2>
          <div className="region-container">
            {opportunities.data &&
              extractLocationsWithCounts(opportunities.data).map(
                (location, i) => (
                  <Link
                    style={{ textDecoration: "none" }}
                    passHref
                    href={`/opportunites?region=${location.location}`}
                    key={i}
                    className="region"
                  >
                    {location.location}
                    <p>{location.count}+ Opportunites</p>
                  </Link>
                )
              )}
          </div>

          <h2 style={{ marginTop: 40 }} className="next-to-you">
            Next To You
          </h2>
          <div className="farm-container">
            {sortedOpportunities.map((opportunity, i) => (
              <Link
                key={i}
                href={`/opportunity/${opportunity._id}`}
                passHref
                className="farm-link"
              >
                <div className="farm">
                  <img
                    src={getImageSrc(opportunity.header_image)}
                    alt="Farm 1"
                  />
                  <p>{opportunity.title}</p>

                  <div className="rating">
                    {Array.from({
                      length: Math.floor(opportunity.rating.score),
                    }).map((star, i) => (
                      <>
                        <input
                          key={i}
                          type="radio"
                          id={`star${i + 1}`}
                          name={`rating${i + 1}`}
                          value={i}
                        />
                        <label className="yellow" htmlFor={`star${i + 1}`}>
                          &#9733;
                        </label>
                      </>
                    ))}
                    {Array.from({
                      length: 5 - Math.floor(opportunity.rating.score),
                    }).map((star, i) => (
                      <>
                        <input
                          key={i}
                          type="radio"
                          id={`star${i + 1}`}
                          name={`rating${i + 1}`}
                          value={i}
                        />
                        <label
                          key={i}
                          className="gray"
                          htmlFor={`star${i + 1}`}
                        >
                          &#9733;
                        </label>
                      </>
                    ))}
                  </div>

                  <div className="divider" />

                  <p className="distance-flex">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 1024 1024"
                      style={{ transform: "translateY(-1px)" }}
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M800 416a288 288 0 1 0-576 0c0 118.144 94.528 272.128 288 456.576C705.472 688.128 800 534.144 800 416M512 960C277.312 746.688 160 565.312 160 416a352 352 0 0 1 704 0c0 149.312-117.312 330.688-352 544" />
                      <path d="M512 512a96 96 0 1 0 0-192 96 96 0 0 0 0 192m0 64a160 160 0 1 1 0-320 160 160 0 0 1 0 320" />
                    </svg>
                    {opportunity.distance.toFixed(2)} km
                  </p>
                </div>
              </Link>
            ))}

            {/* <a href="farm2-page.html" className="farm-link">
              <div className="farm">
                <img src="/Images/R.jpeg" alt="Farm 2" />
                <p>משק חקלאי במושב רוויה</p>

                <div className="rating">
                  <input type="radio" id="star6" name="rating2" value="1" />
                  <label htmlFor="star6">&#9733;</label>
                  <input type="radio" id="star7" name="rating2" value="2" />
                  <label htmlFor="star7">&#9733;</label>
                  <input type="radio" id="star8" name="rating2" value="3" />
                  <label htmlFor="star8">&#9733;</label>
                  <input type="radio" id="star9" name="rating2" value="4" />
                  <label htmlFor="star9">&#9733;</label>
                  <input type="radio" id="star10" name="rating2" value="5" />
                  <label htmlFor="star10">&#9733;</label>
                </div>
              </div>
            </a>

            <a href="farm3-page.html" className="farm-link">
              <div className="farm">
                <img src="/Images/tal.jpg" alt="Farm 3" />
                <p>משק טל נעורים</p>

                <div className="rating">
                  <input type="radio" id="star11" name="rating3" value="1" />
                  <label htmlFor="star11">&#9733;</label>
                  <input type="radio" id="star12" name="rating3" value="2" />
                  <label htmlFor="star12">&#9733;</label>
                  <input type="radio" id="star13" name="rating3" value="3" />
                  <label htmlFor="star13">&#9733;</label>
                  <input type="radio" id="star14" name="rating3" value="4" />
                  <label htmlFor="star14">&#9733;</label>
                  <input type="radio" id="star15" name="rating3" value="5" />
                  <label htmlFor="star15">&#9733;</label>
                </div>
              </div>
            </a> */}
          </div>

          <h2 style={{ marginTop: 40 }} className="all-opportunities">
            All The Opportunities
          </h2>
          <div className="opportunity-container">
            {opportunities.data &&
              opportunities.data.map((opportunity, i) => (
                <Link
                  style={{ textDecoration: "none" }}
                  key={i}
                  href={`/opportunity/${opportunity._id}`}
                  className="opportunity"
                  passHref
                >
                  <img src={opportunity.header_image} alt="Opportunity" />
                  <div className="opportunity-text">
                    <p className="title">{opportunity.title}</p>
                    <p className="description">
                      {" "}
                      {opportunity.description.length > 75
                        ? opportunity.description.substring(0, 75) + "..."
                        : opportunity.description}
                    </p>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </main>

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
