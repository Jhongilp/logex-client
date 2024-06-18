import { FC } from "react";
import styled from "styled-components";
// import { Switch, Route } from "react-router-dom";
import { ExpoParams } from "types/props.types";
// import ExpoModuleMenu from "components/expo-page/screens/expo-module-menu/ExpoModuleMenu";
// import ActivityModule from 'components/expo-page/screens/activity-module/ActivityModule';
// import ShipmentModule from 'components/expo-page/screens/shipment-module/ShipmentModule';

const ExpoModuleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

const ExpoModuleContainer: FC<ExpoParams> = ({ expoId }) => {
  return (
    <ExpoModuleWrapper>
      {/* <ExpoModuleMenu expoId={expoId} /> */}
      {/* <Switch>
        <Route exact path="/expo/:expoId/">
          <ActivityModule />
        </Route>
        <Route path="/expo/:expoId/actividades">
          <ActivityModule />
        </Route>
        <Route path="/expo/:expoId/despacho">
          <ShipmentModule />
        </Route>
      </Switch> */}
    </ExpoModuleWrapper>
  );
};

export default ExpoModuleContainer;
