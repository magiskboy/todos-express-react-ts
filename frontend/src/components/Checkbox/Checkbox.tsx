import React, { useState } from "react";
import s from "./Checkbox.module.css";

type Props = {
  checked?: boolean;
  onChange?: (value: boolean) => void;
};

export const Checkbox: React.FC<React.PropsWithChildren<Props>> = ({
  children,
  checked,
  onChange,
  ...rest
}) => {
  const [value, setValue] = useState(Boolean(checked));

  return (
    <div
      className={s["checkbox-wrapper"]}
      onClick={() => {
        setValue(!value);
        onChange?.(!value);
      }}
    >
      <div
        {...rest}
        className={`${s.checkbox} ${value ? s.checked : ""}`}
      ></div>
      {children}
    </div>
  );
};
