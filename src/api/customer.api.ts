import { gql } from "urql";

export const CustomerQuery = gql`
  query {
    customers {
      id
      name
      country
      city
      address
    }
  }
`;

export const GetCustomerQuery = gql`
  query CustomerQuery($id: ID!) {
    customer(id: $id) {
      id
      name
      country
      city
      address
    }
  }
`;

export const CreateCustomerMutation = gql`
  mutation CreateCustomer($input: CreateCustomerInput) {
    customer: createCustomer(input: $input) {
      name
      address
      city
      country
      id
    }
  }
`;
