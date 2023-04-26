import path from "path";
import { CreatePagesArgs } from "gatsby";

exports.createPages = async ({ graphql, actions }: CreatePagesArgs) => {
  const { createPage } = actions;

  const { data } = await graphql<Queries.GetProductPagesQuery>(`
    query GetProductPages {
      allProductsJson {
        nodes {
          id
          slug
        }
      }
    }
  `);

  const productTemplate = path.resolve("./src/templates/pokemon.tsx");
  const pokemons = data?.allProductsJson.nodes;

  (pokemons || []).forEach((pokemon) => {
    if (!pokemon.slug) {
      return;
    }

    createPage({
      path: pokemon.slug,
      component: productTemplate,
      context: {
        id: pokemon.id,
      },
    });
  });
};
