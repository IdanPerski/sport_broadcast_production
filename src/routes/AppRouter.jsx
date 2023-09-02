import React from "react";
import { Route, Routes } from "react-router-dom";
import ROUTES from "./routesModel";
import AddProduction from "../poductions/pages/AddProduction";

export default function AppRouter() {
  return (
    <Routes>
      {/* <Route path={"/"} element={<AddProduction />} /> */}
      <Route path={ROUTES.ADD_PROD} element={<AddProduction />} />
    </Routes>
  );
}
