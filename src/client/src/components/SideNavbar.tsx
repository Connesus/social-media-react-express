import React from "react";
import {NavLink} from "react-router-dom";
import style from "../styles/SideNavbar.module.scss";
import {Avatar} from "./Post";
import {useSelector} from "react-redux";
import {RootState} from "../redux/store";

export const SideNavbar: React.FC = () => {
  const authUserData = useSelector((state:RootState) => state.auth)
  return (
    <nav className={style.SideNavbar}>
      {authUserData.username ? (<NavLink to="/profile" className={style.SideNavbar__link}>
          <Avatar username={authUserData.username} width={'64px'} height={'64px'} />
          <br/>
        {authUserData.username}
      </NavLink>) : (<NavLink to={'/login'} className={style.SideNavbar__link} style={{color: 'blue'}}>Login</NavLink>)
      }
      <NavLink to="/" className={style.SideNavbar__link}>Feed</NavLink>
      <NavLink to="/search" className={style.SideNavbar__link}>Search</NavLink>
      <NavLink to="/create" className={style.SideNavbar__link}>Create New</NavLink>
      <NavLink to="/messages" className={style.SideNavbar__link}>Messages</NavLink>
    </nav>
  );
};
