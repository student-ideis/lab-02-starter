import { useState } from "react";
import type { Todo } from "../types";

type TodoItemProps = {
  todo: Todo;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
  onEdit: (id: number, text: string) => void;
};

export default function TodoItem({ todo, onToggle, onDelete, onEdit }: TodoItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState(todo.text);

  const handleSave = () => {
    const trimmed = draft.trim();

    if (trimmed.length >= 3) {
      onEdit(todo.id, trimmed);
    }

    setIsEditing(false);
  };

  const handleCancel = () => {
    setDraft(todo.text);
    setIsEditing(false);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSave();
    }

    if (event.key === "Escape") {
      handleCancel();
    }
  };

  const borderColor = {
    niski: "#22c55e",
    normalny: "#f59e0b",
    wysoki: "#ef4444",
  }[todo.priority];

  return (
    <li
      style={{
        borderLeft: `4px solid ${borderColor}`,
        marginBottom: 8,
        padding: "8px 12px",
      }}
    >
      {isEditing ? (
        <>
          <input
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
            onKeyDown={handleKeyDown}
            autoFocus
          />
          <button type="button" onClick={handleSave}>Zapisz</button>
          <button type="button" onClick={handleCancel}>Anuluj</button>
        </>
      ) : (
        <>
          <span style={{ textDecoration: todo.done ? "line-through" : "none" }}>
            {todo.text}
          </span>
          <small className="muted"> ({todo.priority})</small>
          <input type="checkbox" checked={todo.done} onChange={() => onToggle(todo.id)} />
          <button type="button" onClick={() => setIsEditing(true)}>
            Edytuj
          </button>
          <button type="button" onClick={() => onDelete(todo.id)}>
            Usuń
          </button>
        </>
      )}
    </li>
  );
}
