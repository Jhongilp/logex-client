import { gql } from "urql";

export const createBookingMutation = gql`
  mutation createBooking($input: CreateBookingInput) {
    createBooking(input: $input) {
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
  }
`;

export const updateBookingMutation = gql`
  mutation updateBooking($input: UpdateBookingInput) {
    updateBooking(input: $input) {
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
  }
`;
