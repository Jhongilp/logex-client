import { NavLink, useMatches } from "react-router-dom";
import { StyledMenuListWrapper } from "styles/commons";

const routes = [
  {
    to: "info",
    label: "Info",
  },
  {
    to: "shippings",
    label: "Shippings",
  },
  {
    to: "oc",
    label: "Órdenes de compra",
  },
];

export const CustomerMenuList = () => {
  const matches = useMatches();
  return (
    <StyledMenuListWrapper>
      {routes.map((route) => {
        const isActive = matches.some((m) => m.pathname.includes(route.to));
        return (
          <li key={route.to} className={isActive ? "active" : ""}>
            <NavLink to={`${route.to}`}>{route.label}</NavLink>
          </li>
        );
      })}
    </StyledMenuListWrapper>
  );
};
