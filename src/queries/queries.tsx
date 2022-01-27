// import { initializeApollo } from "@libs/apollo";
import { gql, useQuery } from "@apollo/client";

export const get_books = gql`
  query {
    Books {
      title
      genre
    }
  }
`