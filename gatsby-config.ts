import type { GatsbyConfig } from "gatsby";

const config: GatsbyConfig = {
  trailingSlash: "never",
  siteMetadata: {
    title: "Gatsby Workshop",
    siteUrl: "https://www.yourdomain.tld",
  },
  graphqlTypegen: true,
  jsxRuntime: "automatic",
  plugins: [
    "gatsby-plugin-sass",
    "gatsby-plugin-image",
    "gatsby-plugin-sitemap",
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        icon: "src/images/icon.png",
      },
    },
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "images",
        path: "./src/images/",
      },
      __key: "images",
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "data",
        path: "./src/data",
      },
    },
    "gatsby-transformer-json",
  ],
};

export default config;
