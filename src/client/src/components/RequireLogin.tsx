import React, { ReactNode } from "react";
import { Navigate, useLocation } from "react-router";
import { useSelector } from "react-redux";
import { RootState } from "src/redux/store";

export const RequireLogin = (props: { children: ReactNode }): JSX.Element => {
  const isLoggedIn = useSelector((state: RootState) => state.user.isLoggedIn);
  //   setInterval(() => console.log(isLoggedIn), 1000);
  const { pathname } = useLocation();

  return (
    <>
      {isLoggedIn === true ? (
        props.children
      ) : (
        <Navigate to="/login" replace state={{ pathname }} />
      )}
    </>
  );
};
