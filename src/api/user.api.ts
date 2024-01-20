import { gql } from "urql";

export const CreateUserMutation = gql`
  mutation CreateUser($input: CreateUserInput) {
    user: createUser(input: $input) {
      id
      email
      first_name
      second_name
      first_lastname
      second_lastname
      role
      company {
        nit
        name
      }
    }
  }
`;
