import * as React from "react";
import * as ReactDOM from "react-dom";
import { store } from "./redux/store";
import { Provider } from "react-redux";
import LoginPage from "./components/Login";
import { Layout } from "./components/Layout";
import { RequireLogin } from "./components/RequireLogin";
import {
  BrowserRouter,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { getSessionData } from "./redux/slice/user";
import { Feed } from "./components/Feed";
import {PostPage} from "./components/PostPage";
import 'modern-normalize/modern-normalize.css';
// import 'destyle.css'

store.dispatch(getSessionData());

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RequireLogin><Layout><Feed/></Layout></RequireLogin>} />
        <Route path='/post/:postId' element={<RequireLogin><Layout><PostPage /></Layout></RequireLogin>}/>
        <Route path="/login" element={<LoginPage />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
