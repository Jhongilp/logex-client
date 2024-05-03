import { gql } from "urql";

export const GetExposQuery = gql`
  query GetExpos() {
    expos: expos {
      id
      consecutivo
      status
      globalProgress
      createdAt
      customer {
        name
      }
      shipping {
        id
        consignee
        country
        city
        contact
        transport_mode
      }
    }
  }
`;

export const CreateExpoMutation = gql`
  mutation CreateExpo($input: CreateExpoInput) {
    expo: createExpo(input: $input) {
      consecutivo
      status
      globalProgress
      createdAt
      shipping {
        consignee
      }
      customer {
        name
      }
    }
  }
`;
