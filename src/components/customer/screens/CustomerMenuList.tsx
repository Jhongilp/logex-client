import { NavLink } from "react-router-dom";
import { StyledMenuListWrapper } from "styles/commons";

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

// const CustomerMenuLink = ({ route }: { route: any }) => {
//   return (
//     <li className={match ? "active" : ""}>
//       <NavLink
//         to={`customer/${contact.id}`}
//         className={({ isActive, isPending }) =>
//           isActive ? "active" : isPending ? "pending" : ""
//         }
//       >
//         {/* other code */}
//       </NavLink>
//     </li>
//   );
// };

export const CustomerMenuList = () => {
  return (
    <StyledMenuListWrapper>
      {routes.map((route) => {
        // return <CustomerMenuLink route={route}/>;

        return (
          <li key={route.to}>
            <NavLink
              to={`customer/${route.to}`}
              className={({ isActive, isPending }) =>
                isActive ? "active" : isPending ? "pending" : ""
              }
            >
              {route.label}
            </NavLink>
          </li>
        );
      })}
    </StyledMenuListWrapper>
  );
};
