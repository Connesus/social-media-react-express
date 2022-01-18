import React, {useEffect} from "react"
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
import {chatActions} from "./redux/slice/chat";
import {MessagesPage} from "./components/MessagesPage";

import './styles/index.module.scss'
import {ChatPage} from "./components/ChatPage";
import {SearchPage} from "./components/SearchPage";
// import '../node_modules/sacura.css/css/sacura.css'
// import 'destyle.css'

store.dispatch(fetchSessionData());
store.dispatch(chatActions.startConnecting());


ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
    <BrowserRouter>
      <Routes>
        {/*<Route path="/" element={<RequireLogin><Layout><Feed/></Layout></RequireLogin>} />*/}
        <Route path='/post/:postId' element={<Layout><PostPage /></Layout>}/>
        <Route path='/user/:authorId' element={<Layout><ProfilePage /></Layout>}/>
        <Route path='/messages' element={<RequireLogin><Layout><MessagesPage /></Layout></RequireLogin>}/>
        <Route path='/message/:id' element={<RequireLogin><Layout><ChatPage /></Layout></RequireLogin>}/>
        <Route path='/search' element={<Layout><SearchPage /></Layout>}/>
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
