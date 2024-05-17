import React, { useRef, useState } from "react";
import Modal from "react-modal";
import s from "./TaskList.module.css";
import { TaskItem } from "./TaskItem";
import plusCircleIcon from "../../assets/plus-circle.svg";
import { Input } from "../Form";
import { Button } from "../Button/Button";
import { Task } from "../../types";

type Props = {
  tasks: Task[];
  onAddTask?: (task: Omit<Task, "id" | "createdAt">) => void;
  onUpdateTask?: (task: Task) => void;
  onDeleteTask?: (task: Task) => void;
};

export const TaskList: React.FC<Props> = ({
  tasks,
  onUpdateTask,
  onAddTask,
  onDeleteTask,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const taskNameRef = useRef<HTMLInputElement>(null);

  return (
    <div className={s["task-list"]}>
      <div className={s.heading}>
        <h4 className={s["task-list-name"]}>Daily Tasks</h4>
        <img
          src={plusCircleIcon}
          alt="add-task"
          onClick={() => setIsModalOpen(true)}
        />
      </div>
      <ul className={s.tasks}>
        {tasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            onChange={(task) => onUpdateTask?.(task)}
            onDelete={(task) => onDeleteTask?.(task)}
          />
        ))}
      </ul>

      <Modal
        isOpen={isModalOpen}
        style={{ content: { padding: 0, height: "fit-content" } }}
      >
        <div className={s["modal-container"]}>
          <div className={s["modal-heading"]}>
            <img
              src={plusCircleIcon}
              alt="add-task"
              onClick={() => setIsModalOpen(false)}
              className={s["modal-close"]}
            />
          </div>
          <div className={s["modal-body"]}>
            <h2 className={s["modal-title"]}>Add Task</h2>
            <Input
              type="text"
              placeholder="Enter task name"
              ref={taskNameRef}
            />
            <Button
              onClick={() => {
                if (!taskNameRef.current) return;
                onAddTask?.({
                  name: taskNameRef.current.value,
                  isCompleted: false,
                });
                setIsModalOpen(false);
              }}
            >
              Add Task
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
