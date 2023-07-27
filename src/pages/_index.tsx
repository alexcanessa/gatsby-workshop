import { Price, PricesContainer } from "@commercelayer/react-components";
import { type HeadFC, graphql, PageProps, Link } from "gatsby";
import Card from "../components/Card";
import Page from "../components/Page";

const IndexPage = ({ data }: PageProps<Queries.ProductListingQuery>) => {
  const {
    allContentfulPokemon: { nodes: products },
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
        {products.map(({ slug, name, image, shortDescription, sku }) => {
          if (!slug || !name || !sku) {
            return null;
          }

          return (
            <div key={slug} style={{ flex: 1 }}>
              <Card
                title={name}
                imageData={image?.gatsbyImageData || undefined}
                footer={<Link to={slug}>Catch it!</Link>}
              >
                <div style={{ display: "flex" }}>
                  {shortDescription?.shortDescription && (
                    <p>{shortDescription?.shortDescription}</p>
                  )}
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
    allContentfulPokemon {
      nodes {
        slug
        name
        image {
          gatsbyImageData
        }
        sku
        shortDescription {
          shortDescription
        }
      }
    }
  }
`;
