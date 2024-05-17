/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useCallback, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Input } from "../../components/Form";
import s from "./Register.module.css";
import { Button } from "../../components/Button/Button";
import { UserContext } from "../../contexts/UserContext";
import { toast } from "react-toastify";

export const Register: React.FC = () => {
  const navigate = useNavigate();
  const { register } = useContext(UserContext);

  const handleSubmit = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const data = getRegisterData(event);
      const isValid = validateRegisterData(data);
      if (!isValid) {
        toast.error("Passwords do not match");
        return;
      }

      register(data)
        .then((user) => {
          if (!user) return;
          toast.success("Registration successful");
          navigate("/login");
        })
        .catch((error) => toast.error(error.message));
    },
    [navigate, register]
  );

  return (
    <main className={s.main}>
      <div className={s.heading}>
        <h3>Welcome to Onboard</h3>
        <p>Lets help you to meet your tasks</p>
      </div>

      <Form onSubmit={handleSubmit} className={s.form}>
        <Input
          type="text"
          required
          name="name"
          placeholder="Enter your fullname"
        />
        <Input
          type="email"
          required
          name="email"
          placeholder="Enter your email"
        />
        <Input
          type="password"
          required
          minLength={8}
          name="password"
          placeholder="Enter your password"
        />
        <Input
          type="password"
          required
          minLength={8}
          name="confirmPassword"
          placeholder="Confirm your password"
        />

        <div className={s["form-footer"]}>
          <Button className={s.button}>Register</Button>
          <p className={s.login}>
            Already have an account? <Link to="/login">Sign In</Link>
          </p>
        </div>
      </Form>
    </main>
  );
};

function getRegisterData(event: React.FormEvent<HTMLFormElement>) {
  const data = {
    name: (event.target as any).name.value as string,
    email: (event.target as any).email.value as string,
    password: (event.target as any).password.value as string,
    confirmPassword: (event.target as any).confirmPassword.value as string,
  };
  return data;
}

function validateRegisterData(
  data: ReturnType<typeof getRegisterData>
): boolean {
  return data.password === data.confirmPassword;
}
