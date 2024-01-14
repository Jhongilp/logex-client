import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useQuery } from "urql";
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

export const CustomerTable = () => {
  const navigate = useNavigate();
  const [results] = useQuery({
    query: CustomerQuery,
  });

  const { data, fetching, error } = results;

  const handleClickOnCustumer = (customerId) => {
    console.log("click on customer id: ", customerId);
    navigate(`/customers/${customerId}/info`);
  };

  if (fetching) return <p>Loading...</p>;
  if (error) return <p>Oh no... {error.message}</p>;

  console.log("results from user query: ", data);

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
