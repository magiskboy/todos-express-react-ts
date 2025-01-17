import React from "react";
import s from "./TaskItem.module.css";
import { Checkbox } from "../Checkbox";
import minusCircle from "../../assets/minus-circle.svg";
import type { Task } from "../../types";

type Props = {
  task: Task;
  onChange?: (task: Task) => void;
  onDelete?: (task: Task) => void;
};

export const TaskItem: React.FC<Props> = ({ task, onChange, onDelete }) => {
  return (
    <li className={s["task-item"]}>
      <Checkbox
        checked={task.isCompleted}
        onChange={(value) => onChange?.({ ...task, isCompleted: value })}
      >
        <span>{task.name}</span>
      </Checkbox>
      <img
        src={minusCircle}
        className={s["delete-task"]}
        alt="delete-task"
        width={17}
        height={17}
        onClick={() => onDelete?.(task)}
      />
    </li>
  );
};
