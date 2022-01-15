import React, {useCallback, useEffect} from "react"
import style from "../styles/Layout.module.scss";
import { SideNavbar } from "./SideNavbar";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../redux/store";
import {chatActions} from "../redux/slice/chat";

export const Layout: React.FC = (props: { children?: React.ReactNode }) => {
  const dispatch = useDispatch();
  const userId = useSelector((state:RootState) => state.auth._id);

  useCallback(() => {
    if (userId) {
        dispatch(chatActions.startConnecting());
    }
  }, [userId])

  return (
    <main className={style.Layout}>
      <SideNavbar />
      <div className={style.Layout__content}>
        {props.children}
      </div>
    </main>
  );
};
