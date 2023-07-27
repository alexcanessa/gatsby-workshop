import React from "react";
import { FronteggProvider } from "@frontegg/react";
import { navigate } from "gatsby";

export const wrapRootElement = ({ element }) => {
  if (
    !process.env.GATSBY_FRONTEGG_BASE_URL ||
    !process.env.GATSBY_FRONTEGG_CLIENT_ID
  ) {
    console.log(
      "Error: You need to specify FRONTEGG_BASE_URL and FRONTEGG_CLIENT_ID environment variables"
    );
    return null;
  }

  return (
    <FronteggProvider
      history={{
        push: (path: string) => navigate(path),
        replace: (path: string) => navigate(path, { replace: true }),
      }}
      contextOptions={{
        baseUrl: process.env.GATSBY_FRONTEGG_BASE_URL,
        clientId: process.env.GATSBY_FRONTEGG_CLIENT_ID,
      }}
      hostedLoginBox={true}
      authOptions={{
        keepSessionAlive: true,
      }}
    >
      {element}
    </FronteggProvider>
  );
};
