import { ShipmentModuleWrapper } from "components/expo-page/screens/shipment-module/shipment_module.style";
import ShipmentDetails from "components/shipment-details/ShipmentDetails";

export const ShipmentModule = () => {
  return (
    <ShipmentModuleWrapper>
      <ShipmentDetails />
      <p>Shipment Details</p>
    </ShipmentModuleWrapper>
  );
};
