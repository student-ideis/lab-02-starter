export type Priority = "niski" | "normalny" | "wysoki";

export type Todo = {
  id: number;
  text: string;
  done: boolean;
  priority: Priority;
};

export type Filter = "wszystkie" | "aktywne" | "zrobione";
