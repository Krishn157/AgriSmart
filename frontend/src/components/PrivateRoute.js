import React from "react";
import { Route, Navigate } from "react-router-dom";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";

const PrivateRoute = ({ children }) => {
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo, loading } = userLogin;
  return !userInfo && !loading ? (
    <Navigate to="/login?redirect=contract" />
  ) : (
    children
  );
};
export default PrivateRoute;
