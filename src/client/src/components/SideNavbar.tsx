import React from "react";
import {NavLink} from "react-router-dom";

export const SideNavbar: React.FC = () => {
  return (
    <header>
      <NavLink to="/">Feed</NavLink>
      <NavLink to="/message">Messages</NavLink>
      <NavLink to="/profile">Profile</NavLink>
      <NavLink to="/updates">Updates</NavLink>
      <NavLink to="/settings">Settings</NavLink>
    </header>
  );
};
