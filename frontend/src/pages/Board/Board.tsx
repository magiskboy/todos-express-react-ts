import React, { useCallback, useContext, useEffect, useState } from "react";
import s from "./Board.module.css";
import logo3 from "../../assets/logo-3.svg";
import { TaskList } from "../../components/TaskList";
import { UserContext } from "../../contexts/UserContext";
import { useNavigate } from "react-router-dom";
import { addTask, deleteTask, getTaskList, updateTask } from "../../apis";
import { UserPanel } from '../../components/UserPanel';
import { toast } from "react-toastify";
import { Task } from "../../types";

export const Board: React.FC = () => {
  const { user, token, loading: userLoading } = useContext(UserContext);
  const [tasks, setTasks] = useState<Task[]>([]);
  const navigate = useNavigate();
  const [, setLoading] = useState(false);

  useEffect(() => {
    if (!userLoading && !user) {
      navigate("/login");
      return;
    }

    const abortController = new AbortController();
    getTaskList(token!, 200, abortController.signal)
      .then(setTasks)
      .finally(() => setLoading(false));

    return () => {
      abortController.abort("Cancelled fetch tasks");
    };
  }, [token, navigate, user, userLoading]);

  const handleAddTask = useCallback(
    (task: Omit<Task, "id" | "createdAt">) => {
      if (!token) return;

      setLoading(true);
      addTask(task, token)
        .then((task) => setTasks((prevTasks) => [task, ...prevTasks]))
        .catch(error => toast.error(error.message))
        .finally(() => setLoading(false));
    },
    [token]
  );

  const handleUpdateTask = useCallback(
    (task: Task) => {
      if (!token) return;

      setLoading(true);
      updateTask(task, token)
        .then((task) =>
          setTasks((prevTasks) =>
            prevTasks.map((t) => (t.id === task.id ? task : t))
          )
        )
        .catch(error => toast.error(error.message))
        .finally(() => setLoading(false));
    },
    [token]
  );

  const handleDeleteTask = useCallback(
    (task: Task) => {
      if (!token) return;

      setLoading(true);
      deleteTask(task, token)
        .then(() =>
          setTasks((prevTasks) => prevTasks.filter((t) => t.id !== task.id))
        )
        .catch(error => toast.error(error.message))
        .finally(() => setLoading(false));
    },
    [token]
  );

  return (
    <main className={s.main}>
     {user && <UserPanel user={user} />}
      <img className={s.image} src={logo3} alt="Board" />
      <TaskList
        tasks={tasks}
        onAddTask={handleAddTask}
        onUpdateTask={handleUpdateTask}
        onDeleteTask={handleDeleteTask}
      />
    </main>
  );
};
