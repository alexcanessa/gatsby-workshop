import { graphql, PageProps } from "gatsby";
import {
  AddToCartButton,
  Price,
  PricesContainer,
} from "@commercelayer/react-components";
import ReactMarkdown from "react-markdown";
import Page from "../components/Page";

const PokemonPage = ({ data }: PageProps<Queries.ProductPageQuery>) => {
  const { contentfulPokemon: product } = data;

  if (!product?.sku) {
    return null;
  }

  return (
    <Page
      title={product?.name || "Name not found"}
      subtitle={product?.shortDescription?.shortDescription}
      imageData={product?.image?.gatsbyImageData || undefined}
    >
      <div style={{ display: "flex" }}>
        {product?.description?.description && (
          <div style={{ flex: 2 }}>
            <ReactMarkdown>{product?.description?.description}</ReactMarkdown>
          </div>
        )}
        <div
          style={{
            flex: 1,
            paddingLeft: 20,
            marginLeft: 20,
            borderLeft: "1px solid #333",
          }}
        >
          <PricesContainer>
            <span>Price:</span>
            <Price skuCode={product?.sku} showCompare={false} />
          </PricesContainer>
          <div>
            <AddToCartButton
              skuCode={product?.sku}
              style={{
                border: "none",
                padding: 10,
                background: "#9b0000",
                color: "#fff",
                fontFamily: "Arial, Helvetica, Sans-serif",
                fontSize: 18,
                marginTop: 30,
                cursor: "pointer",
              }}
            />
          </div>
        </div>
      </div>
    </Page>
  );
};

export default PokemonPage;

export const query = graphql`
  query ProductPage($slug: String!) {
    contentfulPokemon(slug: { eq: $slug }) {
      name
      description {
        description
      }
      shortDescription {
        shortDescription
      }
      sku
      image {
        gatsbyImageData
      }
    }
  }
`;
