import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home, Board, Login, Register } from "./pages";
import { UserProvider } from "./contexts/UserContext";
import { Layout } from "./components/Layout";
import "./main.css";
import Modal from "react-modal";

Modal.setAppElement("#root");

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <UserProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="" element={<Home />} />
          <Route path="board" element={<Board />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>
      </Routes>
    </UserProvider>
  </BrowserRouter>
);
