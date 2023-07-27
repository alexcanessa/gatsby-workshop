import { graphql } from "gatsby";
import ReactMarkdown from "react-markdown";

const TitleWithContent = ({
  data,
}: {
  data: Queries.TitleWithContentFragment;
}) => {
  return (
    <>
      <h2>{data.title}</h2>
      {data.content?.content && (
        <ReactMarkdown>{data.content.content}</ReactMarkdown>
      )}
    </>
  );
};

export default TitleWithContent;

export const query = graphql`
  fragment TitleWithContent on ContentfulTitleWithContent {
    __typename
    title
    content {
      content
    }
  }
`;
