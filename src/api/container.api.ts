import { gql } from "urql";

export const GetContainerByBookingQuery = gql`
  query containersByBooking($bookingId: ID!) {
    containers: containersByBooking(bookingId: $bookingId) {
      id
      containerNumber
      vehicleId
      transportName
      bookingId
      type
      netWeight
      grossWeight
      dateWithdrawal
      dateLoad
      datePortEntry
      dateSail
      createdAt
    }
  }
`;

export const GetExposWithContainers = gql`
  query GetExposWithContainers {
    expos {
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
      containers {
        id
        containerNumber
        vehicleId
        transportName
        bookingId
        type
        netWeight
        grossWeight
        dateWithdrawal
        dateLoad
        datePortEntry
        dateSail
        createdAt
      }
    }
  }
`;

export const CreateContainerMutation = gql`
  mutation createContainer($input: CreateContainerInput) {
    container: createContainer(input: $input) {
      id
      containerNumber
      vehicleId
      transportName
      bookingId
      type
      dateWithdrawal
      dateLoad
      datePortEntry
      dateSail
      netWeight
      grossWeight
      createdAt
    }
  }
`;

export const UpdateContainerMutation = gql`
  mutation updateContainer($input: UpdateContainerInput) {
    container: updateContainer(input: $input) {
      id
      containerNumber
      vehicleId
      transportName
      bookingId
      type
      dateWithdrawal
      dateLoad
      datePortEntry
      dateSail
      netWeight
      grossWeight
      createdAt
    }
  }
`;
