/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useCallback, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Input } from "../../components/Form";
import s from "./Login.module.css";
import { Button } from "../../components/Button/Button";
import logo2 from "../../assets/logo-2.svg";
import { UserContext } from "../../contexts/UserContext";

export const Login: React.FC = () => {
  const { login, user } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) navigate("/board");
  }, [user, navigate]);

  const handleSubmit = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const data = getLoginData(event);

      login(data.email, data.password).then((user) => {
        if (!user) return;
        navigate("/board");
        return;
      });
    },
    [login, navigate]
  );

  return (
    <main className={s.main}>
      <div className={s.heading}>
        <h3>Welcome back!</h3>
      </div>

      <img
        className={s.image}
        src={logo2}
        width={211}
        height={212}
        alt="Login"
      />

      <Form onSubmit={handleSubmit} className={s.form}>
        <Input
          type="email"
          required
          name="email"
          placeholder="Enter your email"
        />
        <Input
          type="password"
          minLength={8}
          name="password"
          placeholder="Enter your password"
        />

        <div className={s["form-footer"]}>
          <Button className={s.button}>Login</Button>
          <p className={s.login}>
            Don&apos;t have an account? <Link to="/register">Sign up</Link>
          </p>
        </div>
      </Form>
    </main>
  );
};

function getLoginData(event: React.FormEvent<HTMLFormElement>) {
  const data = {
    email: (event.target as any).email.value as string,
    password: (event.target as any).password.value as string,
  };
  return data;
}
