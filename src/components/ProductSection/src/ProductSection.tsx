import { Price, PricesContainer } from "@commercelayer/react-components";
import { graphql, Link } from "gatsby";
import ReactMarkdown from "react-markdown";
import classnames from "classnames";
import * as styles from "./ProductSection.module.scss";
import Card from "../../Card";

const ProductSection = ({ data }: { data: Queries.ProductSectionFragment }) => {
  if (!data.products?.length) {
    return <p>I'm sorry, no products were found.</p>;
  }

  return (
    <div className={classnames(styles.productSection, "product-section")}>
      <h2>{data.title}</h2>
      {data.description?.description && (
        <div>
          <ReactMarkdown>{data.description.description}</ReactMarkdown>
        </div>
      )}
      <div className={styles.cardWrapper}>
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
                <div className={styles.cardContent}>
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
