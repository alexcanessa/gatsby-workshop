import { type HeadFC, graphql, PageProps } from "gatsby";
import ReactMarkdown from "react-markdown";
import Page from "../components/Page";
import Sections from "../components/Sections";

const IndexPage = ({ data }: PageProps<Queries.PageQuery>) => {
  const { contentfulPage: page } = data;

  if (!page) {
    return <>Ooops. Couldn't get data from Contentful</>;
  }

  return (
    <Page
      title={page.title}
      subtitle={
        page.subtitle?.subtitle && (
          <ReactMarkdown>{page.subtitle?.subtitle}</ReactMarkdown>
        )
      }
    >
      {/* @ts-ignore: No idea why this is complaining? */}
      {page?.sections && <Sections data={page.sections} />}
    </Page>
  );
};

export default IndexPage;

export const Head: HeadFC<Queries.PageQuery> = ({ data }) => (
  <>
    <title>Home Page</title>
    {/* @ts-ignore */}
    <script id="edge-config" language="json">
      {JSON.stringify({
        campaigns: data.allContentfulCampaign.nodes,
      })}
    </script>
  </>
);

export const query = graphql`
  query Page($slug: String!) {
    contentfulPage(slug: { eq: $slug }) {
      title
      subtitle {
        subtitle
      }
      sections {
        ...Sections
      }
    }
    allContentfulCampaign {
      nodes {
        id
        trafficAmount
        experiments {
          ... on ContentfulExperiment {
            slug
          }
          ... on ContentfulExperimentReferences {
            slug
          }
        }
      }
    }
  }
`;
