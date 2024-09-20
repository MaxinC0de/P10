import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Home from "./pages/home/index"
import SignPage from "./pages/sign/index"
import User from "./pages/user/index"
import "./assets/main.css"
// REDUX
import { Provider } from "react-redux"
import { configureStore } from "@reduxjs/toolkit"
import rootReducer from "./slices/index"
import ProtectedRoutes from "./components/protectedRoutes"

const store = configureStore({
  reducer: rootReducer,
  devTools: true, 
})

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router >
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/sign-in" element={<SignPage />} />
            <Route path="/user" element={
              <ProtectedRoutes>
                <User />
              </ProtectedRoutes>
            } />
        </Routes>
      </Router>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
