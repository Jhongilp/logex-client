import styled from "styled-components";

import { StyledForm } from "styles/Form/form.styles";

export const StyledCreateBookingForm = styled(StyledForm)`
  > div.booking-consignee {
    grid-area: 1 / 1 / 2 / 7;
  }
  > div.booking-notify {
    grid-area: 1 / 7 / 2 / 13;
  }
  > div.booking-broker {
    grid-area: 2 / 1 / 3 / 7;
  }
  > div.booking-shipping_company {
    grid-area: 2 / 7 / 3 / 13;
  }
  > div.booking-booking_number {
    grid-area: 3 / 1 / 4 / 7;
  }
  > div.booking-documento_transporte_id {
    grid-area: 3 / 7 / 4 / 13;
  }
  > div.booking-transport_mode {
    /* grid-area: 5 / 4 / 6 / 7; */
    grid-area: 5 / 1 / 6 / 4;
    > select {
      height: 35px;
    }
  }
  > div.booking-date_cierre_documental {
    grid-area: 5 / 4 / 6 / 7;
    /* grid-area: 5 / 7 / 6 / 10; */
  }
  > div.booking-date_cierre_fisico {
    grid-area: 5 / 7 / 6 / 10;
    /* grid-area: 5 / 10 / 6 / 13; */
  }
  > div.booking-ciudad_puerto_zarpe {
    grid-area: 6 / 1 / 7 / 4;
    > select {
      height: 35px;
    }
  }
  > div.booking-puerto_zarpe {
    grid-area: 6 / 4 / 7 / 7;
    > select {
      height: 35px;
    }
  }
  > div.booking-eta {
    grid-area: 6 / 7 / 7 / 10;
  }
  > div.booking-destination_country {
    grid-area: 7 / 1 / 8 / 4;
  }
  > div.booking-destination_city {
    grid-area: 7 / 4 / 8 / 7;
  }
  > div.booking-etd {
    grid-area: 7 / 7 / 8 / 10;
  }
  > div.booking-eta_destino {
    grid-area: 7 / 10 / 8 / 13;
  }
  > div.booking-name_motonave {
    grid-area: 8 / 1 / 9 / 7;
  }
  > div.booking-voyage {
    grid-area: 8 / 7 / 9 / 13;
  }
`;
