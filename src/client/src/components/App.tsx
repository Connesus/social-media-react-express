// import React from "react";
// import { RootState } from "../redux/store";
// import { useSelector, useDispatch } from "react-redux";
// import { getSessionData, loginUser } from "../redux/slice/user";

// const user = {
//   email: "sus@aboba.com",
//   password: "sus",
//   username: "sus",
// };

// const App: React.FC = () => {
//   const storeData = useSelector((state) => state);
//   const dispatch = useDispatch();

//   return (
//     <>
//       {JSON.stringify(storeData)}
//       <button onClick={() => dispatch(getSessionData())}>Check session</button>
//       <button onClick={() => dispatch(loginUser(user))}>Login user</button>
//       {/* <button onClick={() => dispatch(getSessionData())}>Create user</button>
//       <button onClick={() => dispatch(getSessionData())}>Create user</button>
//       <button onClick={() => dispatch(getSessionData())}>Create user</button> */}
//     </>
//   );
// };

// export default App;

import * as React from "react";
import { Routes, Route, Link } from "react-router-dom";
import { RequireLogin } from "./RequireLogin";

export default function App(props: { children?: React.ReactNode }) {
  return (
    <>
      <h1>Welcome to React Router!</h1>
      <br />
      {props.children}
    </>
  );
}
