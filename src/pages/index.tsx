import { type HeadFC, graphql, PageProps, Link } from "gatsby";
import Page from "../components/Page";

const IndexPage = ({ data }: PageProps<Queries.ProductListingQuery>) => {
  const {
    allProductsJson: { nodes: products },
  } = data;

  return (
    <Page title={"Gatsby Workshop"}>
      <p>Starting the workshop now</p>
      <ul>
        {products.map(({ slug, name }) => {
          if (!slug) {
            return null;
          }

          return (
            <li>
              <Link to={slug} key={slug}>
                {name}
              </Link>
            </li>
          );
        })}
      </ul>
    </Page>
  );
};

export default IndexPage;

export const Head: HeadFC = () => <title>Home Page</title>;

export const query = graphql`
  query ProductListing {
    allProductsJson {
      nodes {
        slug
        name
      }
    }
  }
`;
