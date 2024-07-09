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
      createdAt
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
