import React from "react";
import { Route, Routes } from "react-router-dom";
import ROUTES from "./routesModel";
import AddProduction from "../poductions/pages/AddProduction";
import HomePage from "../pages/HomePage";
import ErrorPage from "../pages/ErrorPage";

export default function AppRouter() {
  return (
    <Routes>
      <Route path={ROUTES.ADD_PROD} element={<AddProduction />} />
      <Route path={ROUTES.ROOT} element={<HomePage />} />
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
}
