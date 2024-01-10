import { useParams } from "react-router-dom";
import { useQuery } from "urql";
import { GetCustomerQuery } from "api/customer.api";

import {
  StyledCustomerDetailsWrapper,
  StyledInfoLabel,
} from "components/customer/customer.styles";

export const CustomerDetails = () => {
  const { customerId } = useParams();

  const [results] = useQuery({
    query: GetCustomerQuery,
    variables: { id: parseInt(customerId) },
  });

  const { data, fetching, error } = results;
  if (fetching) return <p>Loading...</p>;
  if (error)
    return (
      <p>
        No es posible obtener datos del cliente en este momento. {error.message}
      </p>
    );

  // console.log("get customer query: ", results);
  return (
    <StyledCustomerDetailsWrapper>
      <StyledInfoLabel>
        <label>Nombre</label>
        <span>{data?.customer?.name}</span>
      </StyledInfoLabel>
      <StyledInfoLabel>
        <label>País</label>
        <span>{data?.customer?.country}</span>
      </StyledInfoLabel>
      <StyledInfoLabel>
        <label>Ciudad</label>
        <span>{data?.customer?.city}</span>
      </StyledInfoLabel>
      <StyledInfoLabel>
        <label>Dirección</label>
        <span>{data?.customer?.address}</span>
      </StyledInfoLabel>
    </StyledCustomerDetailsWrapper>
  );
};
