/* eslint-disable @next/next/no-img-element */
import Head from "next/head";
import Header from "../../public/Components/Header";
import Footer from "../../public/Components/Footer";
import jwt from "jsonwebtoken";
import Link from "next/link";

export async function getServerSideProps(context) {
  const { req } = context;
  const protocol = req.headers.referer
    ? req.headers.referer.split(":")[0]
    : "http";
  const host = req.headers.host;

  const hostUrl = `${protocol}://${host}`;
  console.log(hostUrl);
  try {
    const jwtSession = req.cookies.jwtSession;
    const userSession = jwt.decode(jwtSession);

    const userData = JSON.parse(JSON.stringify(userSession));

    try {
      const res = await fetch(
        `${hostUrl}/api/favorites?user_id=${userData.id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await res.json();
      return {
        props: {
          user: JSON.stringify(userSession) || "null",
          favoritesData: JSON.stringify(data) || [],
        },
      };
    } catch (error) {}

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

export default function Favorites({ user, favoritesData }) {
  let data;
  let favoritesDataValues;

  if (user != "null") {
    data = JSON.parse(user);
  }

  try {
    favoritesDataValues = JSON.parse(favoritesData);
  } catch (error) {
    favoritesDataValues = [];
  }

  console.log(favoritesDataValues);

  return (
    <>
      <Head>
        <title>Favorites</title>
        <meta name="description" content="Generated by react" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Header />
        {/* Volunteer */}
        {data && data.role && data.role == "volunteer" && (
          <div style={{ margin: "95px 20px" }}>
            <h2 id="projectTitle">My Favorites</h2>

            <div className="my-applications">
              {favoritesDataValues.favoritesData.length > 0 ? (
                favoritesDataValues.favoritesData.map(
                  (favorite, i) => (
                    <Link
                      passHref
                      href={`/opportunity/${favorite._id}`}
                      key={i}
                      className="vol-application"
                    >
                      <img alt="Image" src="/Images/yo.PNG" className="" />

                      <div>
                        <h2 className="volunteer-title">{favorite.title}</h2>
                        <div
                          style={{ marginTop: -5 }}
                          className="volunteer-rating"
                        >
                          <span className="rating">
                            {favorite.rating.score}
                          </span>
                          <img
                            className="star"
                            src="/Images/svgs/star.svg"
                            alt="Star"
                          />
                          <span className="total-ratings">
                            ({favorite.rating.total_reviews})
                          </span>
                        </div>

                        <div style={{ marginTop: 10 }}>
                          <p className="date">
                            Date:{" "}
                            {new Date(
                              favoritesDataValues.userFavoritesData[
                                i
                              ].date
                            ).toLocaleDateString("en-GB")}
                          </p>
                        </div>
                      </div>

                      <svg
                        width="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M5 12H19M5 12L11 6M5 12L11 18"
                          stroke="rgba(0,0,0,0.5)"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </Link>
                  )
                )
              ) : (
                <div>No favorites found yet.</div>
              )}
            </div>
          </div>
        )}

        {/* Farmer */}
        {data && data.role && data.role == "farmer" && (
          <div style={{ margin: "95px 0px" }}>
            <h2 style={{ margin: "0 20px 15px 20px" }} id="projectTitle">
              My Requests
            </h2>

            <div className="requests-list">
              <div className="request-item">
                {/* SVG USER ICON */}

                <div style={{ width: "100%" }}>
                  <div>
                    <h4 style={{ fontWeight: 500, margin: "8px 0" }}>
                      User Name
                    </h4>
                    <p className="date" style={{ marginBottom: "3px" }}>
                      Date: 02/03/2024
                    </p>

                    <p className="date" style={{ fontWeight: 500 }}>
                      Application: Title Name
                    </p>
                  </div>

                  <div className="req-buttons">
                    <button className="decline">Decline</button>
                    <button className="accept">Accept</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        <Footer />
      </main>
    </>
  );
}




