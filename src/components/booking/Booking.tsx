import { useState, useContext } from "react";
import styled from "styled-components";
import { ButtonAct } from "styles/commons";
import CreateBookingForm from "components/booking/screens/create-booking-form/CreateBookingForm";
import { ExpoContext } from "components/expo-page/ExpoPage";

const BookingWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  color: var(--color-text-dominant);
`;

const BookingProcessOption = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 400px;
  height: 100px;
  margin: 0 auto;
  background-color: var(--color-main-bg);

  > button {
    height: 50px;
  }
`;

enum BookingState {
  INIT,
  REQUESTING, // not anable yet, this will be used when sending email with the booking request
  CREATING,
}

export const Booking = () => {
  const [step, setStep] = useState(BookingState.CREATING);
  const expo = useContext(ExpoContext);

  return (
    <BookingWrapper>
      <div>
        <h1>RESERVA</h1>
      </div>
      <div>
        {step === BookingState.INIT && (
          <BookingProcessOption>
            <ButtonAct
              type="button"
              onClick={() => setStep(BookingState.CREATING)}
            >
              INGRESAR RESERVA
            </ButtonAct>
            <ButtonAct
              type="button"
              onClick={() => setStep(BookingState.REQUESTING)}
              disabled
            >
              SOLICITAR RESERVA
            </ButtonAct>
          </BookingProcessOption>
        )}

        <div>{step === BookingState.CREATING && <CreateBookingForm />}</div>
      </div>
    </BookingWrapper>
  );
};
