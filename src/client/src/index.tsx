import * as React from "react";
import * as ReactDOM from "react-dom";
import { store } from "./redux/store";
import { Provider } from "react-redux";
import App from "./components/App";
import LoginPage from "./components/Login";
import { RequireLogin } from "./components/RequireLogin";
import { BrowserRouter, Router, Route, Routes, Link } from "react-router-dom";
import { getSessionData } from "./redux/slice/user";

store.dispatch(getSessionData());

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <RequireLogin>
              <App>
                <Home />
              </App>
            </RequireLogin>
          }
        />
        <Route
          path="about"
          element={
            <RequireLogin>
              <About />
            </RequireLogin>
          }
        />
        <Route path="/login" element={<LoginPage />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);

// App.js
function Home() {
  return (
    <>
      <main>
        <h2>Welcome to the homepage!</h2>
        <p>You can do this, I believe in you.</p>
      </main>
      <nav>
        <Link to="/about">About</Link>
      </nav>
    </>
  );
}

function About() {
  return (
    <>
      <main>
        <h2>Who are we?</h2>
        <p>That feels like an existential question, don't you think?</p>
      </main>
      <nav>
        <Link to="/">Home</Link>
      </nav>
    </>
  );
}
