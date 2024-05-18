import React from "react";
import { Routes, Route } from "react-router-dom";
import SignIn from "./pages/signup";
import { Login } from "./pages/login";
import { Homepage } from "./pages/homepage";
import PrivateRouteWrapper from "./hooks/PrivateRouteWrapper";
import LoginRouteWrapper from "./hooks/loginWrapper";
import PaymentConfirmationPage from "./components/comfirm";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route
        exact
        path="/"
        element={<LoginRouteWrapper component={<SignIn />} />}
      />
      <Route
        exact
        path="/login"
        element={<LoginRouteWrapper component={<Login />} />}
      />
      <Route
        exact
        path="/confirm"
        element={<LoginRouteWrapper component={<PaymentConfirmationPage />} />}
      />
      <Route
        path="overview"
        element={<PrivateRouteWrapper component={<Homepage />} />}
      />
    </Routes>
  );
};
