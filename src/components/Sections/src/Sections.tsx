import { graphql } from "gatsby";
import ProductSection from "../../ProductSection";
import TitleWithContent from "../../TitleWithContent";
import * as styles from "./Sections.module.scss";

const typenameToSectionComponentMapExperiment = {
  ContentfulProductSection: ProductSection,
  ContentfulTitleWithContent: TitleWithContent,
};

const ExperimentSection = ({ data }: { data: Queries.SectionsFragment }) => {
  if (!data.a || !data.b) {
    return null;
  }

  return (
    <>
      <div className={styles.a}>
        {data.a.map((section) => {
          if (!section) {
            return null;
          }

          const Component =
            typenameToSectionComponentMapExperiment[section.__typename];

          if (!Component) {
            return null;
          }

          return (
            <div className={styles.section}>
              {/* @ts-ignore No idea why an error here either. */}
              <Component data={section} />
            </div>
          );
        })}
      </div>
      <div className={styles.b}>
        {data.b.map((section) => {
          if (!section) {
            return null;
          }

          const Component =
            typenameToSectionComponentMapExperiment[section.__typename];

          if (!Component) {
            return null;
          }

          return (
            <div className={styles.section}>
              {/* @ts-ignore No idea why an error here either. */}
              <Component data={section} />
            </div>
          );
        })}
      </div>
    </>
  );
};

const typenameToSectionComponentMap = {
  ContentfulExperimentReferences: ExperimentSection,
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
          <div className={styles.section}>
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
  fragment Sections on ContentfulExperimentReferences {
    __typename
    a {
      ...ProductSection
      ...TitleWithContent
    }
    b {
      ...ProductSection
      ...TitleWithContent
    }
  }
`;
