import React from "react";
import s from "./Button.module.css";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (props, ref) => {
    return (
      <button
        ref={ref}
        {...props}
        className={`${s.button} ${props.className ? props.className : ""}`}
        data-testid="button"
      >
        {props.children}
      </button>
    );
  }
);
