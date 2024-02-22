import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useQuery, useSubscription } from "urql";
import { CustomerQuery } from "api/customer.api";
import { ICliente } from "types";
import { PropertyType, IColumn } from "types/table-type/table.types";
import Table from "components/table/Table";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: fit-content;
  margin-left: 60px;

  > h3 {
    color: var(--color-text-dominant);
  }
`;

const columns: IColumn<ICliente>[] = [
  {
    type: PropertyType.Text,
    name: "Cliente",
    fieldName: "name",
  },
  {
    type: PropertyType.Text,
    name: "País",
    fieldName: "country",
  },
  {
    type: PropertyType.Text,
    name: "Ciudad",
    fieldName: "city",
  },
  {
    type: PropertyType.Text,
    name: "Dirección",
    fieldName: "address",
  },
];

const onCustomerUpdates = `
  subscription {
    customers {
      id
      name
      country
      shippings {
        id
        consignee
      }
    }
  }
`;

const handleSubscription = (customers = [], response) => {
  console.log("[customers] subs result: ", response)
  return [response?.customers, ...customers];
};

export const CustomerTable = () => {
  const navigate = useNavigate();
  const [res] = useSubscription({ query: onCustomerUpdates }, handleSubscription);
  console.log("[customers][render] subs result: ", res)
  const [results] = useQuery({
    query: CustomerQuery,
  });

  const { data, fetching, error } = results;

  const handleClickOnCustumer = (customerId) => {
    navigate(`/customers/${customerId}/info`);
  };

  if (fetching) return <p>Loading...</p>;
  if (error) return <p>Oh no... {error.message}</p>;

  console.log("[customers] ", data?.customers);
  return (
    <Wrapper>
      <Table
        tableName="customers_table"
        columns={columns}
        rows={data?.customers}
        rowsClickable
        onRowClick={handleClickOnCustumer}
        controlsOmitted
      />
    </Wrapper>
  );
};
