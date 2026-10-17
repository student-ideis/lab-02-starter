import type { Todo } from "../types";
import TodoItem from "./TodoItem";

type TodoListProps = {
  todos: Todo[];
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
  onEdit: (id: number, text: string) => void;
};

// TODO (Zadanie 2): wydziel komponent <TodoItem /> (checkbox, tekst, przyciski "Edytuj" i "Usuń")
//                   i dodaj do propsów callbacki: onToggle, onDelete, onEdit.
export default function TodoList({ todos, onToggle, onDelete, onEdit }: TodoListProps) {
  if (todos.length === 0) return <p className="muted">Brak zadań do wyświetlenia 🎉</p>;

  return (
    <ul style={{ listStyle: "none", padding: 0 }}>
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={() => onToggle(todo.id)}
          onDelete={() => onDelete(todo.id)}
          onEdit={(text) => onEdit(todo.id, text)}
        />
      ))}
    </ul>
  );
}
