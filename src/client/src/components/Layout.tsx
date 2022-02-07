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
    <div className={style["Page-container"]}>
      <div className={style.LayoutWrap}>
        <SideNavbar />
        <main className={style.Layout}>
            {props.children}
        </main>
      </div>
    </div>
  );
};
