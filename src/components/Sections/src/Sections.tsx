import { graphql } from "gatsby";
import ProductSection from "../../ProductSection";
import TitleWithContent from "../../TitleWithContent";
import * as styles from "./Sections.module.scss";

const typenameToSectionComponentMap = {
  ContentfulProductSection: ProductSection,
  ContentfulTitleWithContent: TitleWithContent,
};

// @todo: this should be changed to Sections fragment. Not sure why isn't working yet.
const Sections = ({ data }: { data: readonly Queries.SectionsFragment[] }) => {
  return (
    <>
      {data.map((section) => {
        const Component = typenameToSectionComponentMap[section.__typename];

        if (!Component) {
          return null;
        }

        return (
          <div className={styles.section} key={section.id}>
            {/* @ts-ignore No idea why an error here either. */}
            <Component data={section} />
          </div>
        );
      })}
    </>
  );
};

export default Sections;

export const query = graphql`
  # Fragment type should be changed to custom union.
  fragment Sections on ContentfulProductSectionContentfulTitleWithContentUnion {
    __typename
    ...ProductSection
    ...TitleWithContent
  }
`;
