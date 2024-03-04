import "../styles/globals.css";
const { default: mongoose } = require("mongoose");

export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />;
}
