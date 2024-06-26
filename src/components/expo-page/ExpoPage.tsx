import { useState, createContext } from "react";
import { useQuery } from "urql";
import { Link, useParams } from "react-router-dom";
import { Booking } from "components/booking/Booking";
import { Modal } from "styles/Modal/Modal";
import { PageWrapper, BtnIcon, ButtonAct } from "styles/commons";
import {
  Content,
  ExpoPageHeader,
  ExpoNumber,
  LeftContent,
  RightContent,
  ExpoDetails,
} from "components/expo-page/expo_page.style";

import { ExpoParams } from "types/props.types";
import { MoreHorizontal, BackIcon } from "svgs";

import ExpoModuleContainer from "./screens/expo-module-container/ExpoModuleContainer";
import { IExpo } from "types";
import { initialExpo } from "app_constants";
import { GetExpoQuery } from "api";

export const ExpoContext = createContext<IExpo>({ ...initialExpo });

export const ExpoPage = () => {
  const [open, setOpen] = useState(false);
  const { expoId } = useParams<ExpoParams>();
  const [results] = useQuery<{ expo: IExpo }>({
    query: GetExpoQuery,
    variables: { expoId: expoId },
  });
  const { data, fetching, error } = results;

  if (fetching) {
    return <p>Loading</p>;
  }
  if (error) {
    return <p>There was an error fetching expo</p>;
  }

  const expo = data.expo;

  return (
    <ExpoContext.Provider value={expo}>
      <PageWrapper>
        <Modal open={open} lateral full onClose={() => setOpen(false)}>
          <Booking />
        </Modal>
        <ExpoPageHeader>
          <ExpoNumber>
            <BtnIcon>
              <Link to="/dashboard">
                <BackIcon />
              </Link>
            </BtnIcon>
            <span>{expoId}</span>
          </ExpoNumber>
          <div className="commands">
            <ButtonAct type="button" onClick={() => setOpen(true)}>
              Agregar reserva
            </ButtonAct>
          </div>
          <div>
            <BtnIcon type="button">
              <MoreHorizontal />
            </BtnIcon>
          </div>
        </ExpoPageHeader>
        <Content>
          <LeftContent>
            <ExpoDetails>
              <div className="expo--customer-name">
                <span className="customer-name">{expo.shipping.consignee}</span>
                <span className="destination">{`${
                  expo.shipping.country ? `${expo.shipping.country} /` : ""
                } ${expo.shipping.city ?? ""}`}</span>
              </div>

              <div className="expo--booking">
                <label>Reserva No:</label>
                <span>{expo.booking?.bookingNumber}</span>
              </div>
              <div className="expo--bl">
                <label>BL No:</label>
                <span>{expo.booking?.billOfLandingId ?? ""}</span>
              </div>

              <div className="expo--sailing-city">
                <label>Ciudad zarpe:</label>
                <span>{expo.booking?.cityBondPort}</span>
                {/* <span>{expo.ciudad_puerto_zarpe?.name}</span> */}
              </div>
              <div className="expo--origin-port">
                <label>Terminal porturario:</label>
                <span>{expo.booking?.bondPort}</span>
                {/* <span>{expo.sealing_port?.alias}</span> */}
              </div>
              <div className="expo--shipper">
                <label>Naviera:</label>
                <span>{expo.booking?.shippingCompany}</span>
                {/* <span>{expo.shipping_company}</span> */}
              </div>
              <div className="expo--voyage">
                <label>Viaje / Motonave:</label>
                {/* <span>V25N / VERONICA</span> */}
                <span>{`${
                  expo.booking?.voyage ? `${expo.booking?.voyage} / ` : ""
                } ${expo.booking?.vesselName ?? ""}`}</span>
              </div>

              <div className="expo--broker">
                <label>Agente de carga:</label>
                <span>{expo.booking?.broker}</span>
                {/* <span>{expo.broker}</span> */}
              </div>
              <div className="expo--custom-broker">
                <label>Agente de aduanas:</label>
                <span>AGENCIA DE ADUANAS DHL</span>
              </div>
              <div className="expo--transport">
                <label>Transportador:</label>
                <span>COLTRANS</span>
              </div>
              <div className="expo--schedule">
                <label>Itinerario:</label>
                <div>
                  <ul>
                    <li>
                      <label>ETA:</label>
                      <span>
                        {expo?.booking?.eta
                          ? new Date(expo?.booking?.eta).toLocaleDateString()
                          : ""}
                      </span>
                    </li>
                    <li>
                      <label>Cierre documental:</label>
                      <span>
                        {new Date(
                          expo.booking?.documentsDeadline || ""
                        ).toLocaleDateString()}
                      </span>
                    </li>
                    <li>
                      <label>Cierre físico:</label>
                      <span>
                        {new Date(
                          expo.booking?.inPortDeadline || ""
                        ).toLocaleDateString()}
                      </span>
                    </li>
                    <li>
                      <label>Zarpe:</label>
                      <span>
                        {expo.booking?.etd
                          ? new Date(expo.booking?.etd).toLocaleDateString()
                          : ""}
                      </span>
                    </li>
                    <li>
                      <label>ETA destino:</label>
                      <span>
                        {expo.booking?.etaDestination
                          ? new Date(
                              expo.booking?.etaDestination
                            ).toLocaleDateString()
                          : ""}
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </ExpoDetails>
          </LeftContent>
          <RightContent>
            <ExpoModuleContainer expoId={expoId} />
          </RightContent>
        </Content>
      </PageWrapper>
    </ExpoContext.Provider>
  );
};
