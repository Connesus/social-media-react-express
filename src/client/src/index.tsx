import React from "react"
import ReactDOM from "react-dom";
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
// import { Feed } from "./components/Feed";
import {PostPage} from "./components/PostPage";
import 'modern-normalize/modern-normalize.css';
import {ProfilePage} from "./components/ProfilePage";
import {fetchSessionData} from "./redux/slice/auth";
import {configureStore} from "@reduxjs/toolkit";
import createSagaMiddleware from 'redux-saga'
import {Register} from "./components/Register";
import {Feed} from "./components/Feed";
import {CreatePost} from "./components/CreatePost";
import './styles/global.module.scss'
// import 'destyle.css'

store.dispatch(fetchSessionData());

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
    <BrowserRouter>
      <Routes>
        {/*<Route path="/" element={<RequireLogin><Layout><Feed/></Layout></RequireLogin>} />*/}
        <Route path='/post/:postId' element={<Layout><PostPage /></Layout>}/>
        <Route path='/user/:authorId' element={<Layout><ProfilePage /></Layout>}/>
        <Route path='/profile' element={<RequireLogin><Layout><ProfilePage authProfile /></Layout></RequireLogin>}/>
        <Route path="/login" element={<Layout><LoginPage /></Layout>} />
        <Route path="/create" element={<RequireLogin><Layout><CreatePost /></Layout></RequireLogin>} />
        <Route path="/register" element={<Layout><Register /></Layout>} />
        <Route path ='/' element={<Layout><Feed /></Layout>} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
