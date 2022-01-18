import React from "react";
import {NavLink} from "react-router-dom";
import style from "../styles/SideNavbar.module.scss";
import {Avatar} from "./Post";
import {useSelector} from "react-redux";
import {RootState} from "../redux/store";
import {HomeIcon} from "./icons/HomeIcon";
import {SearchIcon} from "./icons/SearchIcon";
import {MessageIcon} from "./icons/MessageIcon";
import {PostIcon} from "./icons/PostIcon";

const navLinkClass = ({isActive}: {isActive: boolean}): string => [style.SideNavbar__link,
  ...(isActive ? [style['SideNavbar__link--active']] : [])].join(' ');

export const SideNavbar: React.FC = () => {
  const authUserData = useSelector((state:RootState) => state.auth)
  return (
    <nav className={style.SideNavbar}>
      {authUserData.username ? (<NavLink to={'/user/' + authUserData.username} className={navLinkClass}>
          <Avatar username={authUserData.username} width={'64px'} height={'64px'} />
          <br/>
        {authUserData.username}
      </NavLink>) : (<NavLink to={'/login'} className={navLinkClass} style={{color: 'blue'}}>Login</NavLink>)
      }
      <NavLink to="/" className={navLinkClass}>
        <HomeIcon width='48px' height='48px' />
      </NavLink>
      <NavLink to="/search" className={navLinkClass}>
        <SearchIcon width='48px' height='48px' />
      </NavLink>
      <NavLink to="/create" className={navLinkClass}>
        <PostIcon width='48px' height='48px' />
      </NavLink>
      <NavLink to="/messages" className={navLinkClass} >
        <MessageIcon width='48px' height='48px' />
      </NavLink>
    </nav>
  );
};
