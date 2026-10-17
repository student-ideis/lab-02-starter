import { useState } from "react";
import type { Filter, Priority, Todo } from "./types";
import TodoFilter from "./components/TodoFilter";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";

const initialTodos: Todo[] = [
  { id: 1, text: "Przeczytać dokumentację Reacta", done: true, priority: "normalny" },
  { id: 2, text: "Zrobić laboratorium nr 2", done: false, priority: "wysoki" },
  { id: 3, text: "Wyjść na spacer", done: false, priority: "niski" },
];

export default function App() {
  const [todos, setTodos] = useState<Todo[]>(initialTodos);
  const [filter, setFilter] = useState<Filter>("wszystkie");

  const addTodo = (text: string, priority: Priority) => {
    const newTodo: Todo = {
      id: Date.now(),
      text,
      done: false,
      priority,
    };

    setTodos((prev) => [...prev, newTodo]);
  };

  const toggleTodo = (id: number) => {
    setTodos((prev) =>
      prev.map((todo) => (todo.id === id ? { ...todo, done: !todo.done } : todo))
    );
  };

  const deleteTodo = (id: number) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  const editTodo = (id: number, text: string) => {
    setTodos((prev) =>
      prev.map((todo) => (todo.id === id ? { ...todo, text } : todo))
    );
  };

  const clearCompleted = () => {
    setTodos((prev) => prev.filter((todo) => !todo.done));
  };

  const counts: Record<Filter, number> = {
    wszystkie: todos.length,
    aktywne: todos.filter((todo) => !todo.done).length,
    zrobione: todos.filter((todo) => todo.done).length,
  };

  const visibleTodos = todos.filter((todo) => {
    if (filter === "wszystkie") return true;
    if (filter === "aktywne") return !todo.done;
    return todo.done;
  });

  return (
    <>
      <h1>✅ Lista zadań</h1>
      <TodoForm onAdd={addTodo} />
      <TodoFilter
        filter={filter}
        counts={counts}
        onFilterChange={setFilter}
        onClearCompleted={clearCompleted}
      />
      <TodoList
        todos={visibleTodos}
        onToggle={toggleTodo}
        onDelete={deleteTodo}
        onEdit={editTodo}
      />
    </>
  );
}
