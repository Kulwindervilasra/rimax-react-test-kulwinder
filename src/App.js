import React, { useState } from "react";
import axios from "axios";
import "./App.css";
import Routes from "./routes";
import { toast } from "react-toastify";
import { CommonContextProvider } from "../src/common/context";
import "react-toastify/dist/ReactToastify.css";
toast.configure();

function App() {
  const [isLoading, setLoading] = useState(false);

  axios.interceptors.request.use(
    function (config) {
      setLoading(true);
      return config;
    },
    function (error) {
      setLoading(false);
      return Promise.reject(error);
    }
  );
  axios.interceptors.response.use(
    function (response) {
      setLoading(false);
      return response;
    },
    function (error) {
      setLoading(false);
      return Promise.reject(error);
    }
  );

  return (
    <div>
      {isLoading && (
        <div className="loader-container">
          <div className="loader" />
        </div>
      )}
      <CommonContextProvider>
        <Routes />
      </CommonContextProvider>
    </div>
  );
}

export default App;
