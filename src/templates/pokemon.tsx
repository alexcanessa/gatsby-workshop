import { graphql, PageProps } from "gatsby";
import {
  AddToCartButton,
  Price,
  PricesContainer,
} from "@commercelayer/react-components";
import Page from "../components/Page";

const PokemonPage = ({ data }: PageProps<Queries.ProductPageQuery>) => {
  const { productsJson: product } = data;

  if (!product?.sku) {
    return null;
  }

  return (
    <Page
      title={product?.name || "Name not found"}
      subtitle={product?.description}
      imageUrl={product?.image || undefined}
    >
      <div style={{ display: "flex" }}>
        <div style={{ flex: 2 }}>
          <p>{product?.fullDescription}</p>
        </div>
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
  query ProductPage($id: String!) {
    productsJson(id: { eq: $id }) {
      name
      description
      fullDescription
      image
      sku
    }
  }
`;
