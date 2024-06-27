import { useContext } from "react";
import styled from "styled-components";
import { CreateBookingForm } from "components/booking/screens/create-booking-form/CreateBookingForm";
import { EditBookingForm } from "components/booking/screens/edit-booking-form/EditBookingForm";
import { ExpoContext } from "components/expo-page/ExpoPage";

const BookingWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  color: var(--color-text-dominant);
`;

export const Booking = () => {
  const expo = useContext(ExpoContext);

  const isBookingCreated = expo?.booking?.id;

  return (
    <BookingWrapper>
      <div>
        <h1>RESERVA</h1>
      </div>
      <div>
        <div>
          {isBookingCreated ? <EditBookingForm /> : <CreateBookingForm />}
        </div>
      </div>
    </BookingWrapper>
  );
};
