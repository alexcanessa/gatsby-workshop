import { Price, PricesContainer } from "@commercelayer/react-components";
import { graphql, Link } from "gatsby";
import ReactMarkdown from "react-markdown";
import Card from "../../Card";

const ProductSection = ({ data }: { data: Queries.ProductSectionFragment }) => {
  if (!data.products?.length) {
    return <p>I'm sorry, no products were found.</p>;
  }

  return (
    <div>
      <h2>{data.title}</h2>
      {data.description?.description && (
        <div>
          <ReactMarkdown>{data.description.description}</ReactMarkdown>
        </div>
      )}
      <div style={{ display: "flex", gap: 10, marginTop: 50 }}>
        {data.products.map((product) => {
          if (!product) {
            return null;
          }

          const { slug, name, image, shortDescription, sku } = product;

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
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  {shortDescription?.shortDescription && (
                    <p>{shortDescription?.shortDescription}</p>
                  )}
                  <div>
                    <PricesContainer>
                      <span>Price:</span>
                      <Price skuCode={sku} showCompare={false} />
                    </PricesContainer>
                  </div>
                </div>
              </Card>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProductSection;

export const query = graphql`
  fragment ProductSection on ContentfulProductSection {
    __typename
    id
    title
    description {
      description
    }
    products {
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
`;
