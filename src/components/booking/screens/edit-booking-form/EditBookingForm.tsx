import { useContext } from "react";
import { useMutation } from "urql";
import { IBooking, ModoTransporte, CiudadZarpe, PuertoZarpe } from "types";
import { FormHeader, FormCommands } from "styles/Form/form.styles";
import { ButtonAct } from "styles/commons";
import {
  StyledCreateBookingForm,
  BookingFormWrapper,
} from "components/booking/screens/create-booking-form/create_booking.styles";
import { ExpoContext } from "components/expo-page/ExpoPage";
import { updateBookingMutation } from "api";
import { dateStringToInputDate } from "utils"



export const EditBookingForm = () => {
  const [, updateBooking] = useMutation(updateBookingMutation);
  const expo = useContext(ExpoContext);
  const booking = expo?.booking;

  const onCreateBooking = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const elementsArr = Array.from(e.currentTarget.elements) as (
      | HTMLInputElement
      | HTMLButtonElement
      | HTMLSelectElement
    )[];
    console.log("form elements: ", elementsArr);
    const data = elementsArr.reduce<{ [key: string]: string }>(
      (accum, input) => {
        if (input.name) {
          accum[input.name] = input.value;
        }
        return accum;
      },
      {}
    );

    const updatedBooking: IBooking = {
      id: booking?.id,
      expoId: expo.consecutivo,
      consignee: data.consignee,
      notify: data.notify,
      shippingCompany: data.shippingCompany,
      broker: data.broker,
      bookingNumber: data.bookingNumber,
      billOfLandingId: data.billOfLandingId,
      transportMode: data.transportMode,
      cityBondPort: data.cityBondPort,
      bondPort: data.bondPort,
      documentsDeadline: new Date(data.documentsDeadline).toISOString(),
      inPortDeadline: new Date(data.inPortDeadline).toISOString(),
      eta: new Date(data.eta).toISOString(),
      etd: new Date(data.etd).toISOString(),
      etaDestination: new Date(data.etaDestination).toISOString(),
      destinationCountry: data.destinationCountry,
      destinationCity: data.destinationCity,
      vesselName: data.vesselName,
      voyage: data.voyage,
      rollover: false,
    };

    console.log("form data: booking", updatedBooking);

    updateBooking({ input: updatedBooking })
      .then((res) => {
        console.log("Booking updated. ", res);
      })
      .catch((error) => {
        console.log("Error updating booking. ", error);
      });

    // console.log("form data: ", data);
    // console.log("reserva: ", booking);
  };

  // console.log("[edit][booking] : ", booking);

  return (
    <BookingFormWrapper>
      <FormHeader>
        <h3>Crear Reserva</h3>
      </FormHeader>

      <>
        <StyledCreateBookingForm
          id="create-booking-form"
          onSubmit={onCreateBooking}
        >
          <div className="form-field booking-consignee">
            <label>Consignee</label>
            <input
              required
              name="consignee"
              id="consignee"
              defaultValue={booking?.consignee || ""}
            ></input>
          </div>
          <div className="form-field booking-notify">
            <label>Notify</label>
            <input
              required
              name="notify"
              id="notify"
              defaultValue={booking?.notify || ""}
            ></input>
          </div>
          <div className="form-field booking-broker">
            <label>Agente de carga</label>
            <input
              required
              name="broker"
              id="broker"
              defaultValue={booking?.broker}
            ></input>
          </div>
          <div className="form-field booking-shipping_company">
            <label>Naviera</label>
            <input
              required
              name="shippingCompany"
              id="shippingCompany"
              defaultValue={booking?.shippingCompany}
            ></input>
          </div>
          <div className="form-field booking-booking_number">
            <label>Reserva No.</label>
            <input
              required
              name="bookingNumber"
              id="bookingNumber"
              defaultValue={booking?.bookingNumber}
            ></input>
          </div>
          <div className="form-field booking-documento_transporte_id">
            <label>Documento transporte No.</label>
            <input
              // required
              name="billOfLandingId"
              id="billOfLandingId"
              defaultValue={booking?.billOfLandingId}
            ></input>
          </div>

          <div className="form-field booking-transport_mode">
            <label>Modalidad</label>
            <select
              required
              defaultValue={booking?.transportMode || ModoTransporte.MARITIMO}
              name="transportMode"
            >
              <option value={ModoTransporte.AEREO}>Aereo</option>
              <option value={ModoTransporte.MARITIMO}>Marítimo</option>
              <option value={ModoTransporte.TERRESTRE}>Terrestre</option>
            </select>
          </div>

          <div className="form-field booking-date_cierre_documental">
            <label>Cierre documental</label>
            <input
              required
              type="date"
              name="documentsDeadline"
              id="documentsDeadline"
              defaultValue={dateStringToInputDate(booking?.documentsDeadline)}
            ></input>
          </div>
          <div className="form-field booking-date_cierre_fisico">
            <label>Cierre físico</label>
            <input
              required
              type="date"
              name="inPortDeadline"
              id="inPortDeadline"
              defaultValue={dateStringToInputDate(booking?.inPortDeadline)}
            ></input>
          </div>
          <div className="form-field booking-ciudad_puerto_zarpe">
            <label>Ciudad origen</label>
            <select
              required
              name="cityBondPort"
              defaultValue={booking?.cityBondPort}
            >
              {Object.keys(CiudadZarpe).map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </div>
          <div className="form-field booking-puerto_zarpe">
            <label>Puerto origen</label>
            <select required name="bondPort" defaultValue={booking?.bondPort}>
              {Object.keys(PuertoZarpe).map((port) => (
                <option key={port} value={port}>
                  {port}
                </option>
              ))}
            </select>
          </div>
          <div className="form-field booking-eta">
            <label>ETA</label>
            <input
              required
              type="date"
              name="eta"
              id="eta"
              defaultValue={dateStringToInputDate(booking?.eta)}
            ></input>
          </div>
          <div className="form-field booking-destination_country">
            <label>País destino</label>
            <input
              required
              name="destinationCountry"
              id="destinationCountry"
              defaultValue={booking?.destinationCountry || ""}
            ></input>
          </div>
          <div className="form-field booking-destination_city">
            <label>Ciudad destino</label>
            <input
              required
              name="destinationCity"
              id="destinationCity"
              defaultValue={booking?.destinationCity || ""}
            ></input>
          </div>
          <div className="form-field booking-etd">
            <label>ETD</label>
            <input
              required
              type="date"
              name="etd"
              id="etd"
              defaultValue={dateStringToInputDate(booking?.etd)}
            ></input>
          </div>
          <div className="form-field booking-eta_destino">
            <label>ETA destino</label>
            <input
              required
              type="date"
              name="etaDestination"
              id="etaDestination"
              defaultValue={dateStringToInputDate(booking?.etaDestination)}
            ></input>
          </div>
          <div className="form-field booking-name_motonave">
            <label>Motonave</label>
            <input
              required
              name="vesselName"
              id="vesselName"
              defaultValue={booking?.vesselName}
            ></input>
          </div>
          <div className="form-field booking-voyage">
            <label>Viaje</label>
            <input
              required
              name="voyage"
              id="voyage"
              defaultValue={booking?.voyage}
            ></input>
          </div>
        </StyledCreateBookingForm>
        <FormCommands>
          <ButtonAct form="create-booking-form">Editar</ButtonAct>
        </FormCommands>
      </>
    </BookingFormWrapper>
  );
};
