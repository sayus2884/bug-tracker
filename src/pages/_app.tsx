import "../styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "../sections/Layout/Layout";

const SafeHydrate: React.FC = ({ children }) => {
  return <div suppressHydrationWarning>{typeof window === "undefined" ? null : children}</div>;
};

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SafeHydrate>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SafeHydrate>
  );
}

export default MyApp;
