import path from "path";
import { CreatePagesArgs } from "gatsby";

exports.createPages = async ({ graphql, actions }: CreatePagesArgs) => {
  const { createPage } = actions;

  const { data } = await graphql<Queries.GetAllPagesQuery>(`
    query GetAllPages {
      allContentfulPokemon {
        nodes {
          __typename
          slug
        }
      }
      allContentfulPage {
        nodes {
          __typename
          slug
        }
      }
    }
  `);

  const typenameToTemplateMap = {
    ContentfulPokemon: path.resolve("./src/templates/pokemon.tsx"),
    ContentfulPage: path.resolve("./src/templates/page.tsx"),
  };
  const pokemons = data?.allContentfulPokemon.nodes || [];
  const pages = data?.allContentfulPage.nodes || [];

  [...pages, ...pokemons].forEach((page) => {
    if (!page.slug) {
      return;
    }

    createPage({
      path: page.slug,
      component: typenameToTemplateMap[page.__typename],
      context: {
        slug: page.slug,
      },
    });
  });
};
