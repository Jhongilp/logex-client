import { gql } from "urql";

export const GetExposQuery = gql`
  query GetExpos() {
    expos: expos {
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
      booking {
        cityBondPort
        bondPort
        bookingNumber
        shippingCompany
        broker        
      }
      
    }
  }
`;

export const GetExpoQuery = gql`
  query ExpoQuery($expoId: ID!) {
    expo(id: $expoId) {
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
        notify
        country
        city
        contact
        transport_mode
      }
      booking {
        id
        expoId
        consignee
        notify
        shippingCompany
        broker
        transportMode
        cityBondPort
        bondPort
        destinationCountry
        destinationCity
        bookingNumber
        billOfLandingId
        vesselName
        voyage
        eta
        etd
        etaDestination
        documentsDeadline
        inPortDeadline
        rollover
      }
      todoList {
        id
        expoId
        name
        status
        progress
        responsible
        optional
        enabled
        completedAt
        deadline
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
