import React, {SyntheticEvent, useEffect} from "react"
import {useDispatch, useSelector} from "react-redux";
import {createUser, selectIsLoggedIn} from "../redux/slice/auth";
import {useLocation, useNavigate} from "react-router-dom";


export const Register = React.memo( () => {
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
      dispatch(createUser({
        password: passwordRef.current.value,
        username: usernameRef.current.value
      }))
    }
  }

  return (
    <form onSubmit={handleSubmit} style={{display: "flex", flexDirection: "column", gap: "16px"}}>
      REGISTER PAGE
      <div>
        <label>Username:</label>
        <input ref={usernameRef} type={'text'}/>
      </div>
      <div>
        <label>Password:</label>
        <input ref={passwordRef} type={'password'} />
      </div>
      <div>
        <button type="submit">Submit</button>
      </div>
    </form>
  );
});
