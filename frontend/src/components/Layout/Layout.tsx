import React, { useContext } from "react";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UserContext } from "../../contexts/UserContext";
import { Spinner } from "../Spinner";

export const Layout: React.FC = () => {
  const { loading } = useContext(UserContext);

  const LoadingScreen = () => {
    return (
      <div
        style={{
          width: "100%",
          height: "100svh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          boxSizing: 'border-box',
        }}
      >
        <Spinner />
      </div>
    );
  };
  return (
    <main>
      <ToastContainer />
      {loading ? <LoadingScreen /> : <Outlet />}
    </main>
  );
};
