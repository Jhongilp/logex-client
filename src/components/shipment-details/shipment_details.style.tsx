import styled from "styled-components";

export const ShipmentDetails = styled.div`
    display: flex;
    flex-direction: column;
`

export const ShipmentTableWrapper = styled.div`
    display: flex;
    max-width: 690px;
    padding: 0 0 40px 50px;
    /* overflow-x: auto; */

    @media (min-width: 1200px) {
        max-width: 1250px;
    }

`