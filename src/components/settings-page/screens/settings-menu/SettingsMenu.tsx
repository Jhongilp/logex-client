import { FC } from "react";
import { Link, useMatch } from "react-router-dom";
import styled from "styled-components";
import { MenuExpoLink } from "types/props.types";

const SettingsMenuWrapper = styled.ul`
  display: flex;
  flex-direction: column;
  width: 200px;
  height: 100%;
  margin: 0;
  padding: 0;
  background-color: var(--color-main-bg);

  li {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 45px;
    padding: 0 12px;

    a {
      display: flex;
      align-items: center;
      width: 100%;
      height: 100%;
      font-size: 16px;
      font-weight: 400;
      color: var(--color-text-dominant);

      &:active,
      &::visited {
        color: var(--color-text-dominant);
      }
    }
  }

  li:hover {
    /* background-color: var(--color-main-bg); */
    background-color: var(--color-main-bg-terciary);
  }

  li.active {
    background-color: var(--color-main-bg-terciary);
    border-left: 2px solid var(--color-text-secondary);

    > a {
      font-weight: bold;
    }
  }
`;

const routes = [
  {
    to: "users",
    label: "Usuarios",
  },
  {
    to: "roles",
    label: "Roles",
  },
  {
    to: "checklist",
    label: "Lista de actividades",
  },
];

const SettingsMenuLink: FC<MenuExpoLink> = ({ to, label }) => {
  // const match = useMatch({
  //   path: to,
  //   exact: false,
  // });
  const match = useMatch(to);

  return (
    <li className={match ? "active" : ""}>
      <Link to={to}>{label}</Link>
    </li>
  );
};

const SettingsMenu = () => {
  return (
    <SettingsMenuWrapper>
      {routes.map((route) => {
        return (
          <SettingsMenuLink
            key={route.label}
            to={`/settings/${route.to}`}
            label={route.label}
          />
        );
      })}
    </SettingsMenuWrapper>
  );
};

export default SettingsMenu;
