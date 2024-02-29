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

export const UpdateCustomerMutation = gql`
  mutation UpdateCustomer($input: UpdateCustomerInput) {
    customer: updateCustomer(input: $input) {
      name
      address
      city
      country
      id
    }
  }
`;

export const DeleteCustomerMutation = gql`
  mutation DeleteCustomer($id: ID!) {
    deleteCustomer(id: $id) {
      id
      name
    }
  }
`;

export const ShippingsQuery = gql`
  query GetShippings($customerId: ID) {
    shippings: shippings(customerId: $customerId) {
      id
      consignee
      notify
      country
      city
      transport_mode
      address
      contact
      email
      phone
      obs
      customerId
    }
  }
`;

export const CreateShippingMutation = gql`
  mutation CreateShipping($input: CreateShippingInput) {
    shipping: createShipping(input: $input) {
      consignee
      notify
      country
      city
      transport_mode
      address
      contact
      email
      phone
      obs
      customerId
    }
  }
`;

export const GetShippingQuery = gql`
  query GetShipping($id: ID!) {
    shipping: shipping(id: $id) {
      id
      consignee
      notify
      country
      city
      transport_mode
      address
      contact
      email
      phone
      obs
      customerId
    }
  }
`;

export const UpdateShippingMutation = gql`
  mutation UpdateShipping($input: UpdateShippingInput) {
    shipping: updateShipping(input: $input) {
      id
      consignee
      notify
      country
      city
      transport_mode
      address
      contact
      email
      phone
      obs
      customerId
    }
  }
`;

export const DeleteShippingMutation = gql`
  mutation DeleteShipping($id: ID!) {
    deleteShipping(id: $id) {
      id
    }
  }
`;

// Subscriptions

export const onCustomerUpdates = `
  subscription {
    customers {
      id
      name
      country
      city
      address
    }
  }
`;

export const onShippingUpdates = `
  subscription {
    shippings {
      id
      consignee
      notify
      country
      city
      transport_mode
      address
      contact
      email
      phone
      obs
      customerId
    }
  }
`;
