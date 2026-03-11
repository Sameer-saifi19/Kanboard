export type Task = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  title: string;
  description: string | null; 
  order: number;
  columnId: string;
};

export type Column = {
  id: string;
  createdAt: Date;
  upatedAt: Date;  
  title: string;
  projectId: string;
  tasks: Task[];
};