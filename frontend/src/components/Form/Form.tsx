import React, { FormHTMLAttributes } from "react";
import s from './Form.module.css';

type FormProps = FormHTMLAttributes<HTMLFormElement>;

export const Form = React.forwardRef<HTMLFormElement, FormProps>(
  ({ children, ...rest }, ref) => {
    return (
      <form ref={ref} {...rest} className={`${s.form} ${rest.className || ''}`}>
        {children}
      </form>
    );
  }
);
