import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useQuery } from "urql";
import { CustomerQuery } from "api/customer.api";
import { ICliente } from "types";
import { PropertyType, IColumn } from "types/table-type/table.types";
import Table from "components/table/Table";
import { useAppSelector } from "hooks/store.hooks";

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
  const customers = useAppSelector((state) => state.customers);
  const navigate = useNavigate();
  const [results] = useQuery<{ customers: ICliente[] }>({
    query: CustomerQuery,
  });

  const { fetching, error } = results;

  const handleClickOnCustumer = (customerId) => {
    navigate(`/customers/${customerId}/info`);
  };

  if (fetching) return <p>Loading...</p>;
  if (error) return <p>Oh no... {error.message}</p>;

  console.log("[customers] from store:", customers);
  return (
    <Wrapper>
      <Table
        tableName="customers_table"
        columns={columns}
        rows={customers || []}
        rowsClickable
        onRowClick={handleClickOnCustumer}
        controlsOmitted
      />
    </Wrapper>
  );
};
