import { gql } from "urql";

export const GetExposQuery = gql`
  query GetExpos($userId: ID!) {
    expos: expos(userId: $userId) {
      id
      consecutivo
      status
      globalProgress
      indicatator_month
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