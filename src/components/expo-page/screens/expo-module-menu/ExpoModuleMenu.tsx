import React, { FC } from "react";
import { Link, useRouteMatch } from "react-router-dom";
import styled from "styled-components";
import { ExpoParams, MenuExpoLink } from "types/props.types";

const ModuleMenuWrapper = styled.ul`
  display: flex;
  justify-content: space-between;
  width: 100;
  height: 35px;
  margin: 0;
  padding: 0;
  border-bottom: 1px solid var(--color-text-light);

  li {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 20%;
    height: 100%;

    a {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 100%;
      font-family: "Open Sans";
      color: var(--color-text-dominant);
      font-weight: 400;

      &:active,
      &::visited {
        color: var(--color-text-dominant);
      }
    }
  }

  li:hover {
    background-color: var(--color-main-bg);
  }

  li.active {
    background-color: var(--color-main-bg);
    border-bottom: 2px solid var(--color-text-secondary);
  }
`;

const routes = [
  {
    to: "actividades",
    label: "ACTIVIDADES",
  },
  {
    to: "despacho",
    label: "DESPACHO",
  },
  {
    to: "documentos",
    label: "DOCUMENTOS",
  },
  {
    to: "liquidacion",
    label: "LIQUIDACIÓN",
  },
  {
    to: "indicadores",
    label: "INDICADORES",
  },
];

const ExpoMenuLink: FC<MenuExpoLink> = ({ to, label }) => {
  let match = useRouteMatch({
    path: to,
    exact: false,
  });

  return (
    <li className={match ? "active" : ""}>
      <Link to={to}>{label}</Link>
    </li>
  );
};

const ExpoModuleMenu: FC<ExpoParams> = ({ expoId }) => {
  return (
    <ModuleMenuWrapper>
      {routes.map((route) => {
        return (
          <ExpoMenuLink
            key={route.label}
            to={`/expo/${expoId}/${route.to}`}
            label={route.label}
          />
        );
      })}
    </ModuleMenuWrapper>
  );
};

export default ExpoModuleMenu;
