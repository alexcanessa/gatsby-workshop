import { graphql, PageProps } from "gatsby";
import Page from "../components/Page";

const PokemonPage = ({ data }: PageProps<Queries.ProductPageQuery>) => {
  const { productsJson: product } = data;

  return (
    <Page title={product?.name || "Name not found"}>
      <p>{product?.description || "Description not found"}</p>
    </Page>
  );
};

export default PokemonPage;

export const query = graphql`
  query ProductPage($id: String!) {
    productsJson(id: { eq: $id }) {
      name
      description
    }
  }
`;
