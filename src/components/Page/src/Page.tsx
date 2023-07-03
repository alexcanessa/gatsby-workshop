import CommerceLayerAuth from "../../CommerceLayerAuth";
import Footer from "../../Footer";
import Header from "../../Header";
import Hero from "../../Hero/src/Hero";
import Spring from "../../Spring";
import * as styles from "./Page.module.scss";

export type PageProps = {
  children: React.ReactNode;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  imageUrl?: string;
};

const GATSBY_CLIENT_ID = process.env.GATSBY_CLIENT_ID;
const GATSBY_SLUG = process.env.GATSBY_SLUG;
const GATSBY_MARKET_ID = process.env.GATSBY_MARKET_ID;

const Page = ({ children, title, subtitle, imageUrl }: PageProps) => {
  if (!GATSBY_CLIENT_ID || !GATSBY_SLUG || !GATSBY_MARKET_ID) {
    return <p>Ohoopppsss</p>;
  }

  return (
    <CommerceLayerAuth
      clientId={GATSBY_CLIENT_ID}
      slug={GATSBY_SLUG}
      market={+GATSBY_MARKET_ID}
    >
      <main>
        <Header />
        <Hero title={title} imageUrl={imageUrl}>
          {subtitle}
        </Hero>
        <Spring>
          <div className={styles.content}>{children}</div>
        </Spring>
        <Footer />
      </main>
    </CommerceLayerAuth>
  );
};

export default Page;
