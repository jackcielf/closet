import { Routes, Route } from "react-router-dom";
import { Home, Casual, Social } from "./pages";
import { Navigate } from "react-router-dom";
import { RouteConfig } from "./utils/models/route-config";

export const routes: RouteConfig[]  = [
  {
    path: "*",
    component: Navigate,
    to: "/home"
  },
  {
    path: "/not-found",
    component: Navigate,
    to: "/home"
  },
  {
    path: "/home",
    component: Home,
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
    path: "/inventario/vestidos",
    component: Home,
  },
  {
    path: "/inventario/blusas",
    component: Home,
  },
  {
    path: "/inventario/calcas",
    component: Home,
  },
  {
    path: "/inventario/saias",
    component: Home,
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
