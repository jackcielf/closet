import { Routes, Route } from "react-router-dom";
import { Dashboard, Casual, Social } from "./pages";
import { Navigate } from "react-router-dom";
import { RouteConfig } from "./utils/models/route-config";

export const routes: RouteConfig[]  = [
  {
    path: "*",
    component: Navigate,
    to: "/home/dashboard"
  },
  {
    path: "/not-found",
    component: Navigate,
    to: "/home/dashboard"
  },
  {
    path: "/looks/social",
    component: Social,
  },
  {
    path: "/looks/casual",
    component: Casual,
  },
  {
    path: "/home/dashboard",
    component: Dashboard,
  },
];

export const AppRouting = () => {
  return (
    <Routes>
      {routes.map((route, index) => (
        <Route
          key={index}
          path={route.path}
          element={<route.component {...(route.to ? { to: route.to } : {})} />}
        />
      ))}
    </Routes>
  );
};
