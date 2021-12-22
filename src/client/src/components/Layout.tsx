import * as React from "react";
import style from "../styles/Layout.module.scss";
import { SideNavbar } from "./SideNavbar";

export const Layout: React.FC = (props: { children?: React.ReactNode }) => {
  return (
    <main className={style.Layout}>
      <SideNavbar />
      {props.children}
    </main>
  );
};
