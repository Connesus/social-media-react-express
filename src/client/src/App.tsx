import React from "react";
import { RootState } from "./redux/store";
import { useSelector, useDispatch } from "react-redux";
import { decrement } from "./redux/slice/counter";

const user = {
  email: "user@gmail.com",
  password: "pass",
  username: "user",
};

const App: React.FC = () => {
  const count = useSelector((state: RootState) => state.counter.value);
  const dispatch = useDispatch();

  return (
    <>
      {count}
      <button onClick={() => dispatch(decrement())}>Decrease</button>
    </>
  );
};

export default App;
