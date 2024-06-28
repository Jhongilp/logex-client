import { FunctionComponent } from "react";
import { Link } from "react-router-dom";
import { ExpoStatus, IBooking } from "types";
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
  Circle,
  StatusProgress,
} from "components/dashboard/screens/expo-table/expo_table.style";
import { expoStatusToString, stepIcon } from "utils";

type StatusProps = {
  status: ExpoStatus;
  globalProgress: number;
};

const Status: FunctionComponent<StatusProps> = ({ status, globalProgress }) => {
  console.log("[status] ", status)
  return (
    <StatusWrapper>
      <StatusRow>
        <Circle />
        <div className="status-icon">{stepIcon[status]}</div> 
        <span>{expoStatusToString(status)?.toUpperCase()}</span>
      </StatusRow>
      <StatusRow $lower={true}>
        <StatusProgress $progress={globalProgress} />
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
  const consecutivo = expo?.consecutivo;
  const booking = expo?.booking ?? ({} as IBooking);

  return (
    <Row>
      <td>
        <Cell>
          <span className="upper">
            <Link to={`/expo/${consecutivo}`}>{consecutivo}</Link>
          </span>
          <span className="lower">
            {`${booking?.cityBondPort ? `${booking?.cityBondPort} / ` : ""}`}
            {booking?.bondPort}
          </span>
        </Cell>
      </td>
      <td>
        <Cell>
          <span className="upper">{expo?.customer?.name}</span>
          <span className="lower">
            {expo?.shipping?.country} - {expo?.shipping?.city}
          </span>
        </Cell>
      </td>
      <td>
        <Cell>
          <span className="upper">{booking?.bookingNumber}</span>
          <span className="lower">
            {`${
              booking?.shippingCompany ? `${booking?.shippingCompany} / ` : ""
            }`}
            {booking?.broker}
          </span>
        </Cell>
      </td>
      <td>
        <Cell>
          <Status status={expo?.status} globalProgress={expo?.globalProgress} />
        </Cell>
      </td>
    </Row>
  );
};

const Body: FunctionComponent<TableExpoProps> = ({ exportaciones }) => {
  return (
    <TableBody>
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
