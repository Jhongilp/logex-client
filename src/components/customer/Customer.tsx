// import { useState } from "react";
import styled from "styled-components";
// import { useSelector } from "react-redux";

// import ExpoTable from "components/dashboard/screens/expo-table/ExpoTable";
import { CustomerTable } from "components/customer/screens/CustomerTable";
import { StyledMain, StyledContent, ContentWrapper } from "styles/commons";

import { gql, useQuery } from "urql";

const CustomerQuery = gql`
  query {
    customers {
      name
      country
      city
      address
    }
  }
`;

const Content = styled(StyledContent)`
  height: calc(100vh - 105px);
`;

const Wrapper = styled(ContentWrapper)`
  display: flex;
  flex-direction: column;
  padding: 0 20px;
`

const Customer = () => {
  const [results] = useQuery({
    query: CustomerQuery,
  });

  const { data, fetching, error } = results;

  if (fetching) return <p>Loading...</p>;
  if (error) return <p>Oh no... {error.message}</p>;

  console.log("results from user query: ", data);
  return (
    <StyledMain>
      <Content>
        <Wrapper>
          <h2>CUSTOMERS</h2>
          <CustomerTable customers={data.customers} />
        </Wrapper>
      </Content>
    </StyledMain>
  );
};

export default Customer;
