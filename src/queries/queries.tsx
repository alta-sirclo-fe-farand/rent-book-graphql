import { gql } from "@apollo/client";

export const GET_BOOKS = gql`
  query {
    books {
      id
      title
      image
    }
  }
`;

export const GET_BOOKS_BY_ID = gql`
  query ($id: Int!) {
    books(where: { id: { _eq: $id } }) {
      id
      title
      ISBN
      author
      image
    }
  }
`;

export const GET_USERS = gql`
  query {
    users {
      id
      name
      email
      password
    }
  }
`;

export const GET_USERS_BY_ID = gql`
  query ($id: Int!) {
    users(where: { id: { _eq: $id } }) {
      id
      name
      email
      password
    }
  }
`;

export const GET_RENTS = gql`
  query {
    rents {
      id
      user_id
      book_id
      return_date
      returned
    }
  }
`;

export const GET_RENTS_BY_ID = gql`
  query ($user_id: Int!) {
    rents(where: { user_id: { _eq: $user_id } }) {
      id
      book_id
      return_date
      returned
    }
  }
`;

export const POST_RENTS = gql`
  mutation ($book_id: Int!, $user_id: Int!, $return_date: date!) {
    insert_rents(
      objects: {
        book_id: $book_id
        user_id: $user_id
        return_date: $return_date
      }
    ) {
      affected_rows
    }
  }
`;

export const PUT_USERS = gql`
  mutation ($id: Int!, $name: String!, $email: String!, $password: String!) {
    update_users_by_pk(
      pk_columns: { id: $id }
      _set: { name: $name, email: $email, password: $password }
    ) {
      id
      name
      email
      password
    }
  }
`;

export const PUT_RENTS = gql`
  mutation ($id: Int!) {
    update_rents_by_pk(pk_columns: { id: $id }, _set: { returned: true }) {
      id
      returned
    }
  }
`;

export const DELETE_USERS_BY_ID = gql`
  mutation ($id: Int!) {
    delete_users_by_pk(id: $id) {
      affected_rows
    }
  }
`;
