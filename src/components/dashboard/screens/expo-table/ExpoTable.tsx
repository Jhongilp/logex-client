import { FunctionComponent } from "react";
import { Link } from "react-router-dom";
import { ExpoStatus } from "types";
import { TableExpoProps, ExpoItemProps } from "types/props.types";

import {
  MainBoardWrapper,
  TableWrapper,
  ExpoTable,
  TableBody,
  Row,
  RowHeader,
  TableHeader,
  Cell,
  StatusWrapper,
  StatusRow,
  // Circle,
  StatusProgress,
} from "components/dashboard/screens/expo-table/expo_table.style";
import { stepIcon } from 'utils';


type StatusProps = {
  status: ExpoStatus;
  globalProgress: number,
};

const Status: FunctionComponent<StatusProps> = ({ status,  globalProgress}) => {
  return (
    <StatusWrapper>
      <StatusRow>
        {/* <Circle /> */}
        <div className="status-icon">{stepIcon[status]}</div>
        <span>{status}</span>
      </StatusRow>
      <StatusRow lower>
        <StatusProgress progress={globalProgress}/>
        <span className="status-progress">{`${globalProgress}%`}</span>

      </StatusRow>
    </StatusWrapper>
  );
};

const Header = () => {
  return (
    <TableHeader>
      <RowHeader>
        <th>Exportación</th>
        <th>Cliente</th>
        <th>Reserva</th>
        <th>Estado</th>
      </RowHeader>
    </TableHeader>
  );
};

const ExpoItem: FunctionComponent<ExpoItemProps> = ({ expo }) => {
  // const {
  //   consecutivo,
  //   customer_name,
  //   destination_country,
  //   puerto_destino,
  //   status,
  //   booking,
  //   globalProgress
  // } = expo;
  const consecutivo = expo?.consecutivo;

  // const { broker, shipping_company, ciudad_puerto_zarpe, puerto_zarpe } =
  //   booking ?? {};
  return (
    <Row>
      <td>
        <Cell>
          <span className="upper">
            <Link to={`/expo/${consecutivo}`}>{consecutivo}</Link>
          </span>
          <span className="lower">
            Pending / Pending
            {/* {`${
              ciudad_puerto_zarpe?.alias
                ? `${ciudad_puerto_zarpe?.alias} / `
                : ""
            }`}
            {puerto_zarpe?.alias} */}
          </span>
        </Cell>
      </td>
      <td>
        <Cell>
          {/* <span className="upper">{customer_name}</span> */}
          <span className="upper">{expo?.customer?.name}</span>
          <span className="lower">
            {/* {destination_country} - {puerto_destino} */}
            {expo?.shipping?.country} - {expo?.shipping?.city}
          </span>
        </Cell>
      </td>
      <td>
        <Cell>
          {/* <span className="upper">{booking?.booking_number}</span> */}
          <span className="upper">{0}</span>
          <span className="lower">
            {/* {`${shipping_company ? `${shipping_company} / ` : ""}`}
            {broker} */}
            Pending / Pending
          </span>
        </Cell>
      </td>
      <td>
        <Cell>
          {/* <Status status={status} globalProgress={globalProgress}/> */}
          <Status status={expo?.status} globalProgress={expo?.globalProgress}/>
        </Cell>
      </td>
    </Row>
  );
};

const Body: FunctionComponent<TableExpoProps> = ({ exportaciones }) => {
  return (
    <TableBody>
      {/* {Object.keys(exportaciones).map((expoId) => ( */}
      {exportaciones?.map((expo) => (
        <ExpoItem key={expo.consecutivo} expo={expo} />
      ))}
    </TableBody>
  );
};

const MainBoard: FunctionComponent<TableExpoProps> = ({ exportaciones }) => {
  return (
    <MainBoardWrapper>
      <TableWrapper>
        <ExpoTable>
          <Header />
          <Body exportaciones={exportaciones} />
        </ExpoTable>
      </TableWrapper>
    </MainBoardWrapper>
  );
};

export default MainBoard;
