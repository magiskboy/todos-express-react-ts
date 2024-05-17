import { BACKEND_URL } from "./config";
import { Task, User } from "./types";

export async function addTask(
  task: Omit<Task, "id" | "createdAt">,
  token: string
): Promise<Task> {
  const url = `${BACKEND_URL}/api/tasks`;
  const response = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(task),
  });

  if (!response.ok) {
    const { error } = await response.json();
    throw new Error(error);
  }

  const { data } = await response.json();
  return data;
}

export async function updateTask(task: Task, token: string): Promise<Task> {
  console.log(BACKEND_URL);
  const url = `${BACKEND_URL}/api/tasks/${task.id}`;
  const response = await fetch(url, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(task),
  });

  if (!response.ok) {
    const { error } = await response.json();
    throw new Error(error);
  }

  const { data } = await response.json();
  return data;
}

export async function deleteTask(task: Task, token: string): Promise<void> {
  const url = `${BACKEND_URL}/api/tasks/${task.id}`;
  const response = await fetch(url, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const { error } = await response.json();
    throw new Error(error);
  }
}

export async function getTaskList(
  token: string,
  limit?: number,
  signal?: AbortSignal
): Promise<Task[]> {
  const url = `${BACKEND_URL}/api/tasks?limit=${limit || 200}`;
  const response = await fetch(url, {
    signal,
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const { error } = await response.json();
    throw new Error(error);
  }

  const { data } = await response.json();
  return data;
}

export async function loginUser(
  email: string,
  password: string
): Promise<{ accessToken: string; user: User }> {
  const url = `${BACKEND_URL}/api/users/login`;
  const response = await fetch(url, {
    headers: { "Content-Type": "application/json" },
    method: "POST",
    body: JSON.stringify({
      email,
      password,
    }),
  });

  if (!response.ok) {
    throw new Error("An error occurred. Please try again");
  }

  const { data } = await response.json();

  return data;
}

export async function registerUser(payload: Omit<User, "id">): Promise<User> {
  const url = `${BACKEND_URL}/api/users`;
  const response = await fetch(url, {
    headers: { "Content-Type": "application/json" },
    method: "POST",
    body: JSON.stringify(payload),
  });
  if (!response.ok) {
    throw new Error("An error occurred. Please try again");
  }

  const { data } = await response.json();

  return data;
}

export async function getCurrentUser(
  token: string,
  signal?: AbortSignal
): Promise<User> {
  const url = `${BACKEND_URL}/api/users/me`;
  const response = await fetch(url, {
    signal,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    throw new Error("An error occurred. Please try again");
  }

  const { data } = await response.json();
  return data;
}
