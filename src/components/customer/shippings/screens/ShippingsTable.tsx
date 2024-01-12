import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useQuery } from "urql";
import { ShippingsQuery } from "api/customer.api";
import { IShipping } from "types";
import { PropertyType, IColumn } from "types/table-type/table.types";
import Table from "components/table/Table";

const Wrapper = styled.div`
  display: flex;
  margin-top: 25px;
  overflow-y: auto;
`;

const columns: IColumn<IShipping>[] = [
  {
    type: PropertyType.Text,
    name: "Consignee",
    fieldName: "consignee",
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
    name: "Modo de transporte",
    fieldName: "transport_mode",
  },
  {
    type: PropertyType.Text,
    name: "Contacto",
    fieldName: "contact",
  },
];

export const ShippingsTable = () => {
  const navigate = useNavigate();
  const [results] = useQuery<{ shippings: IShipping[] }>({
    query: ShippingsQuery,
  });

  const { data, fetching, error } = results;

  const handleClickOnCustumer = (customerId) => {
    console.log("click on customer id: ", customerId);
    navigate(`/customers/${customerId}/info`);
  };

  if (fetching) return <p>Loading...</p>;
  if (error) return <p>Oh no... {error.message}</p>;

  console.log("results from shippings query: ", data);

  return (
    <Wrapper>
      <Table
        tableName="settings_table"
        columns={columns}
        rows={data?.shippings}
        rowsClickable
        onRowClick={handleClickOnCustumer}
        controlsOmitted
      />
    </Wrapper>
  );
};
