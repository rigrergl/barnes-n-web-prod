import type { AppProps } from "next/app";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import "./css/registration.css";
import "./css/search.css";
import "./css/login.css";
import "./css/loanbooksubmission.css";
import "./css/profile.css";
import "./css/checkout.css";
import "./css/indexStyle.css";
import "./css/history.css";

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
