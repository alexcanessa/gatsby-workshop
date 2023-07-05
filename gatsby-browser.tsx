/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/reference/config-files/gatsby-browser/
 */

import React from "react"
import { FronteggProvider } from "@frontegg/react"
import { navigate } from "gatsby"

export const wrapRootElement = ({ element }) => {

  return (
    <FronteggProvider
      history={{
        push: (path: string) => navigate(path),
        replace: (path : string) => navigate(path, { replace: true })
      }}
      contextOptions={{
        baseUrl: 'FRONTEGG_BASE_URL',
        clientId: 'FRONTEGG_CLIENT_ID'
      }}
      hostedLoginBox={true}
      authOptions={{
        keepSessionAlive: true
      }}
    >
      {element}
    </FronteggProvider>
  )
}
