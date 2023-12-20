import styled from "styled-components";
import { Link } from "react-router-dom";
import {
  DashboardIcon,
  CustomerIcon,
  SupplierIcon,
  IndicatorIcon,
  CostIcon,
  DirectoryIcon,
  SettingsIcon
} from "svgs";

const StyledSidebar = styled.div`
  display: flex;
  background-color: var(--color-main-bg);
  color: var(--color-main-bg-dark);
  border-right: 1px solid var(--color-main-bg-secondary);
  /* width: 40px; */

  ul {
    display: flex;
    flex-direction: column;
    width: 100%;
    padding: 0;
    margin: 0;

    li {
      display: flex;
      align-items: center;
      justify-content: center;
      list-style: none;
      width: 40px;
      height: 40px;

      &:hover {
        background-color: var(--color-text-light);
      }

      &:active {
        transform: translateY(1px);
      }

      a {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;

        svg {
          fill: var(--color-text-dominant);
        }
      }
    }
  }
`;

const Sidebar = () => {
  return (
    <StyledSidebar>
      <ul>
        <li title="Exportaciones">
          <Link to="/dashboard">
            <DashboardIcon />
          </Link>
        </li>
        <li title="Clientes">
          <Link to="/clientes">
            <CustomerIcon />
          </Link>
        </li>
        <li title="Proveedores">
          <Link to="/proveedores">
            <SupplierIcon />
          </Link>
        </li>
        <li title="Indicadores">
          <Link to="/indicadores">
            <IndicatorIcon />
          </Link>
        </li>
        <li title="Liquidación">
          <Link to="/liquidaciones">
            <CostIcon />
          </Link>
        </li>
        <li title="Directorio">
          <Link to="/directorio">
            <DirectoryIcon />
          </Link>
        </li>
        <li title="Configuración">
          <Link to="/settings">
            <SettingsIcon />
          </Link>
        </li>
      </ul>
    </StyledSidebar>
  );
};

export default Sidebar;
