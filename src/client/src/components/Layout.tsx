import React from "react"
import style from "../styles/Layout.module.scss";
import { SideNavbar } from "./SideNavbar";

export const Layout: React.FC = (props: { children?: React.ReactNode }) => {
  return (
    <main className={style.Layout}>
      <SideNavbar />
      <div className={style.Layout__content}>
        {props.children}
      </div>
    </main>
  );
};
