# Workshop structure

On this file you'll find a list of useful resources to be used during the workshop.

## Data Sources

For this section we will install an `npm` package called `gatsby-transformer-json`.

To install it, run:

```bash
yarn add gatsby-transformer-json
```

### Product schema

This is an example schema for our product.

```typescript
type Product = {
  __typename: "Product"; // Field required for the workshop
  name: string; // Field required for the workshop
  slug: string; // Field required for the workshop
  shortDescription: string;
  isInStock: boolean;
};
```
