import React, { useCallback } from "react";
import s from "./Home.module.css";
import logo from "../../assets/logo.svg";
import { Button } from "../../components/Button/Button";
import { useNavigate } from "react-router-dom";

export const Home: React.FC = () => {
  const navigate = useNavigate();

  const handleGetStarted = useCallback(() => {
    navigate("/register");
  }, [navigate]);

  return (
    <main className={s.main}>
      <img className={s.image} src={logo} width={220} height={187} alt="Todos" />
      <div className={s.welcome}>
        <h3>Get things done with Todo</h3>
        <p>
          Welcome to Todo App it helps to Build, Organize & Collaborate on Work
          in One Place from Virtually anywhere. Use a to-do list to capture
          every task and collaborate with teammates in one place.
        </p>
      </div>
      <Button className={s.button} onClick={handleGetStarted}>
        Get Started
      </Button>
    </main>
  );
};
