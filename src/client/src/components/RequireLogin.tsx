import { ReactNode } from "react";
import * as React from "react"
import { Navigate, useLocation } from "react-router";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import {selectIsLoggedIn} from "../redux/slice/auth";

export const RequireLogin = (props: { children: ReactNode }): JSX.Element => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  //   setInterval(() => console.log(isLoggedIn), 1000);
  const { pathname } = useLocation();

  return (
    <>
      {isLoggedIn ? (
        props.children
      ) : (
        <Navigate to="/login" replace state={{ pathname }} />
      )}
    </>
  );
};
