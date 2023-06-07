import CommerceLayerAuth from "../../CommerceLayerAuth";
import * as styles from "./Page.module.scss";

export type PageProps = {
  children: React.ReactNode;
  title: React.ReactNode;
};

// const GATSBY_CLIENT_ID = "JCsJR5n2pCfUIe4EIYzKXuNDRKxDW5r__J724UCAwg0"; // CLI
const GATSBY_CLIENT_ID = "K_bEKkTml8rd4p-OoQbsttuFrwc6AYT6ZJxb-C7sVx8";
const GATSBY_SLUG = "pokeshop";
const GATSBY_MARKET_ID = 13552;

const Page = ({ children, title }: PageProps) => {
  if (!GATSBY_CLIENT_ID || !GATSBY_SLUG || !GATSBY_MARKET_ID) {
    return <p>Ohoopppsss</p>;
  }

  return (
    <CommerceLayerAuth
      clientId={GATSBY_CLIENT_ID}
      slug={GATSBY_SLUG}
      market={+GATSBY_MARKET_ID}
    >
      <main className={styles.page}>
        <h1 className={styles.title}>{title}</h1>
        <div>{children}</div>
      </main>
    </CommerceLayerAuth>
  );
};

export default Page;
