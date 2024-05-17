import React from "react";
import s from './Button.module.css';

type ButtonProps = React.HTMLAttributes<HTMLButtonElement>;

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
    return <button ref={ref} {...props} className={`${s.button} ${props.className ? props.className : ''}`}>{props.children}</button>;
});