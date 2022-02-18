import React from "react";
import {matchRoutes, NavLink, PathMatch, useLocation, useMatch} from "react-router-dom";
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

const iconClassFn = (match: PathMatch | null) => {
  console.log('match',!!match)
  console.log('')
  const res = [
    style['SideNavbar__link-icon'],
    ...(!!match ? [style['SideNavbar__link-icon--active']] : [])
  ].join(' ');
  console.log(res)
  return res
}

export const SideNavbar: React.FC = () => {
  const authUserData = useSelector((state:RootState) => state.auth)
  const location = useLocation()
  return (
    <nav className={style.SideNavbar}>
      {authUserData.username ? (<NavLink to={'/user/' + authUserData.username} className={navLinkClass}>
          <Avatar username={authUserData.username} inlineStyle={{width: 'var(--step-3)', height: 'var(--step-3)'}} />
        <span className={style['SideNavbar__link-text']}>profile</span>
      </NavLink>) : (<NavLink to={'/login'} className={navLinkClass}>LOGIN</NavLink>)
      }
      <NavLink to="/" className={navLinkClass}>
        <div className={style['SideNavbar__link-container-icon']}>
          <HomeIcon className={iconClassFn(useMatch('/'))} />
        </div>
        <span className={style['SideNavbar__link-text']}>feed</span>
      </NavLink>
      <NavLink to="/search" className={navLinkClass}>
        <div className={style['SideNavbar__link-container-icon']}>
          <SearchIcon className={iconClassFn(useMatch('/search'))} />
        </div>
        <span className={style['SideNavbar__link-text']}>search</span>
      </NavLink>
      <NavLink to="/create" className={navLinkClass}>
        <div className={style['SideNavbar__link-container-icon']}>
          <PostIcon className={iconClassFn(useMatch('/create'))} />
        </div>
        <span className={style['SideNavbar__link-text']}>post</span>
      </NavLink>
      <NavLink to="/messages" className={navLinkClass} >
        <div className={style['SideNavbar__link-container-icon']}>
          <MessageIcon className={iconClassFn(useMatch('/messages'))} />
        </div>
        <span className={style['SideNavbar__link-text']}>message</span>
      </NavLink>
    </nav>
  );
};
