import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "../redux/slice/user";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

const user = {
  email: "sus@aboba.com",
  password: "sus",
  //   username: "sus",
};

const LoginPage = () => {
  const dispatch = useDispatch();
  const handleLogin = () => dispatch(loginUser(user));
  const isLoggedIn = useSelector((state: RootState) => state.user.isLoggedIn);
  const { state } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      navigate(state.pathname || "/");
    }
  }, [isLoggedIn]);

  return (
    <div>
      <h3>LoginPage</h3>
      <Link to="/">Home</Link>
      Already have account? <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default LoginPage;
