export type Status = "todo" | "progress" | "done";

export interface Task {
  id: string;
  title: string;
  description?: string;
  status: Status;
}

export interface Column {
  id: Status;
  title: string;
}