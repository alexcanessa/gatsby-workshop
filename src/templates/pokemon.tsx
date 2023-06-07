import { graphql, PageProps } from "gatsby";
import {
  AddToCartButton,
  CartLink,
  LineItem,
  LineItemAmount,
  LineItemName,
  LineItemQuantity,
  LineItemRemoveLink,
  LineItemsContainer,
  LineItemsCount,
  Price,
  PricesContainer,
} from "@commercelayer/react-components";
import Page from "../components/Page";
import * as styles from "./pokemon.module.scss";

const PokemonPage = ({ data }: PageProps<Queries.ProductPageQuery>) => {
  const { productsJson: product } = data;

  if (!product?.sku) {
    return null;
  }

  return (
    <Page title={product?.name || "Name not found"}>
      <header className={styles.header}>
        <LineItemsContainer>
          <CartLink label="Go to checkout" className={styles.cartLink} />
        </LineItemsContainer>
        <LineItemsContainer>
          <p className="your-custom-class">
            Your shopping cart contains <LineItemsCount /> items
          </p>
          <LineItem>
            <LineItemName />
            <LineItemQuantity max={10} />
            <LineItemAmount />
            <LineItemRemoveLink />
          </LineItem>
        </LineItemsContainer>
      </header>
      <p>{product?.description || "Description not found"}</p>
      <PricesContainer>
        <span>Price:</span>
        <Price skuCode={product?.sku} showCompare={false} />
      </PricesContainer>
      <AddToCartButton skuCode={product?.sku} />
    </Page>
  );
};

export default PokemonPage;

export const query = graphql`
  query ProductPage($id: String!) {
    productsJson(id: { eq: $id }) {
      name
      description
      sku
    }
  }
`;
