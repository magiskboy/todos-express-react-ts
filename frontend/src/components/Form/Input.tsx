import React from "react";
import s from "./Input.module.css";

type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (props, ref) => {
    return (
      <input
        data-testid="input"
        ref={ref}
        {...props}
        className={`${s.input} ${props.className || ""}`}
      />
    );
  }
);
