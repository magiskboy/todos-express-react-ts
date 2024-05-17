export type User = {
  id: string;
  name: string;
  profile?: string;
  email: string;
};

export type Task = {
  name: string;
  isCompleted: boolean;
  id: string;
  createdAt: string;
};