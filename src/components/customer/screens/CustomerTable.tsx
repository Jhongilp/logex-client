import styled from "styled-components";

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

export const CustomerTable = ({ customers }: { customers: ICliente[] }) => {
  const handleClickOnCustumer = () => {
    alert("click on customer");
  };

  return (
    <Wrapper>
      <Table
        tableName="settings_table"
        columns={columns}
        rows={customers}
        rowsClickable
        onRowClick={handleClickOnCustumer}
        controlsOmitted
      />
    </Wrapper>
  );
};
