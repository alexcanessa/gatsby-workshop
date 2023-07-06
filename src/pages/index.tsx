import { Price, PricesContainer } from "@commercelayer/react-components";
import { type HeadFC, graphql, PageProps, Link } from "gatsby";
import Card from "../components/Card";
import Page from "../components/Page";

const IndexPage = ({ data }: PageProps<Queries.ProductListingQuery>) => {
  const {
    allProductsJson: { nodes: products },
  } = data;

  return (
    <Page
      title={"Composable Series / The PokéShop experiment"}
      subtitle={
        "An easy way of building composable, using Contentful, CommerceLayer, FrontEgg, Netlify, and GatsbyJS to create an eCommerce selling Pokémon!"
      }
    >
      <h2>Catch our Pokémons</h2>
      <p>
        We have so many evolutions, from so many generations! Add them all to
        your basket and buy them all!
      </p>
      <div style={{ display: "flex", gap: 10, marginTop: 50 }}>
        {products.map(({ slug, name, image, description, sku }) => {
          if (!slug || !name || !sku) {
            return null;
          }

          return (
            <div key={slug} style={{ flex: 1 }}>
              <Card
                title={name}
                imageUrl={image || undefined}
                footer={<Link to={slug}>Catch it!</Link>}
              >
                <div style={{ display: "flex" }}>
                  <p>{description}</p>
                  <PricesContainer>
                    <span>Price:</span>
                    <Price skuCode={sku} showCompare={false} />
                  </PricesContainer>
                </div>
              </Card>
            </div>
          );
        })}
      </div>
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
        image
        description
        sku
      }
    }
  }
`;
