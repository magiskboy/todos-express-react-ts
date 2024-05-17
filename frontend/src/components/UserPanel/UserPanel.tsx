import React from "react";
import { DEFAULT_PROFILE } from "../../config";
import s from "./UserPanel.module.css";

type Props = React.HTMLProps<HTMLDivElement> & {
  user: {
    profile?: string;
    name: string;
  };
  onClickProfile?: () => void;
};
export const UserPanel: React.FC<Props> = ({ user, onClickProfile, ...rest }) => {
  return (
    <div {...rest} className={`${rest.className} ${s.heading}`}>
      <img
        width={100}
        height={100}
        className={s.profile}
        src={user.profile || DEFAULT_PROFILE}
        alt={user.name}
        onClick={() => onClickProfile?.()}
      />
      <h3 className={s.welcome}>Welcome {user.name}</h3>
    </div>
  );
};
