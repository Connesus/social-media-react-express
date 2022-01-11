import React from "react";
import {NavLink} from "react-router-dom";
import style from "../styles/SideNavbar.module.scss";
import {Avatar} from "./Post";
import {useSelector} from "react-redux";
import {RootState} from "../redux/store";
import LoginPage from "./Login.js";

export const SideNavbar: React.FC = () => {
  const authUserData = useSelector((state:RootState) => state.auth)
  console.log('authUserData', authUserData)
  return (
    <header className={style.SideNavbar}>
      {authUserData.username ? (<NavLink to="/profile" className={style.SideNavbar__link}>
          <Avatar username={authUserData.username} width={'64px'} height={'64px'} />
          <br/>
        {authUserData.username}
      </NavLink>) : (<NavLink to={'/login'} className={style.SideNavbar__link} style={{color: 'blue'}}>Login</NavLink>)
      }
      <NavLink to="/" className={style.SideNavbar__link}>Feed</NavLink>
      <NavLink to="/create" className={style.SideNavbar__link}>Create New</NavLink>
      <NavLink to="/message" className={style.SideNavbar__link}>Messages</NavLink>
      <NavLink to="/updates" className={style.SideNavbar__link}>Updates</NavLink>
      <NavLink to="/settings" className={style.SideNavbar__link}>Settings</NavLink>
    </header>
  );
};
