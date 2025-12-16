const domain = "haggstorm.myshopify.com";
const token = "4cd182a6329dcf82517ddb70b5267333";

export async function shopifyFetch({ query, variables }: { query: string; variables?: any }) {
  try {
    const response = await fetch(`https://${domain}/api/2024-01/graphql.json`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Storefront-Access-Token": token,
      },
      body: JSON.stringify({ query, variables }),
    });

    const json = await response.json();
    if (json.errors) {
      console.error("Shopify Errors:", json.errors);
      throw new Error("Failed to fetch from Shopify");
    }
    return json;
  } catch (error) {
    throw new Error(`Error fetching from Shopify: ${error}`);
  }
}

export async function getProductById(id: string) {
  const query = `
    query getProductById($id: ID!) {
      node(id: $id) {
        ... on Product {
          id
          title
          description
          descriptionHtml
          images(first: 5) {
            edges {
              node {
                url
                altText
              }
            }
          }
          variants(first: 1) {
            edges {
              node {
                id
                price {
                  amount
                  currencyCode
                }
                compareAtPrice {
                  amount
                  currencyCode
                }
              }
            }
          }
        }
      }
    }
  `;

  const response = await shopifyFetch({
    query,
    variables: { id },
  });

  return response.data?.node;
}

export async function createCart(variantId: string, quantity: number) {
  const query = `
    mutation createCart($lines: [CartLineInput!]!) {
      cartCreate(input: { lines: $lines }) {
        cart {
          id
          checkoutUrl
          lines(first: 10) {
            edges {
              node {
                quantity
                merchandise {
                  ... on ProductVariant {
                    id
                  }
                }
              }
            }
          }
        }
      }
    }
  `;

  const response = await shopifyFetch({
    query,
    variables: {
      lines: [
        {
          merchandiseId: variantId,
          quantity: quantity,
        },
      ],
    },
  });

  return response.data?.cartCreate?.cart;
}
