import {Ref, SyntheticEvent, useCallback, useEffect, useState} from "react";
import React from "react"
import { useDispatch } from "react-redux";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {UserLoginDataT} from "@shared/types";
import {loginUser, selectIsLoggedIn} from "../redux/slice/auth";
import {types} from "node-sass";

const user: UserLoginDataT = {
  username: 'sus',
  password: "sus",
};

const LoginPage = React.memo( () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const state = location.state as {pathname: string}
    if (isLoggedIn) {
      navigate(state?.pathname || "/");
    }
  }, [isLoggedIn]);

  const usernameRef = React.useRef<HTMLInputElement>(null);
  const passwordRef = React.useRef<HTMLInputElement>(null);

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    if (usernameRef.current && passwordRef.current) {
      dispatch(loginUser({
        password: passwordRef.current.value,
        username: usernameRef.current.value
      }))
    }
    }

  return (
    <form onSubmit={handleSubmit} style={{display: "flex", flexDirection: "column", gap: "16px"}}>
      LOGIN PAGE
      <div>
        <label>Username:</label>
        <input ref={usernameRef} type={'text'}/>
      </div>
      <div>
        <label>Password:</label>
        <input ref={passwordRef} type={'password'} />
      </div>
      <Link to={'/register'}>Register</Link>
      <div>
        <button type="submit">Submit</button>
      </div>
    </form>
  );
});

export default LoginPage;
