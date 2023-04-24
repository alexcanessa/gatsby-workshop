import type { HeadFC } from "gatsby";
import Page from "../components/Page";

const IndexPage = () => {
  return (
    <Page title={"Gatsby Workshop"}>
      <p>Starting the workshop now</p>
    </Page>
  );
};

export default IndexPage;

export const Head: HeadFC = () => <title>Home Page</title>;
