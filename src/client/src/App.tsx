import React from "react";
import { RootState } from "./redux/store";
import { useSelector, useDispatch } from "react-redux";
import { getSessionData } from "./redux/slice/user";

const user = {
  email: "sus@aboba.com",
  password: "sus",
  username: "sus",
};

const App: React.FC = () => {
  const dispatch = useDispatch();

  return (
    <>
      {JSON.stringify(user)}
      <button onClick={() => dispatch(getSessionData())}>Create user</button>
    </>
  );
};

export default App;
