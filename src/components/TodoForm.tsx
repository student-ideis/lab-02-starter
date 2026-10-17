import { useState } from "react";
import type { Priority } from "../types";

type TodoFormProps = {
  onAdd: (text: string, priority: Priority) => void;
};

function validateText(text: string): string {
  const trimmed = text.trim();

  if (trimmed.length === 0) return "Treść zadania jest wymagana.";
  if (trimmed.length < 3) return "Treść musi mieć co najmniej 3 znaki.";
  if (trimmed.length > 80) return "Treść może mieć maksymalnie 80 znaków.";

  return "";
}

export default function TodoForm({ onAdd }: TodoFormProps) {
  const [text, setText] = useState("");
  const [priority, setPriority] = useState<Priority>("normalny");
  const [touched, setTouched] = useState(false);

  const error = validateText(text);
  const showError = touched && error !== "";

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setTouched(true);

    if (error) {
      return;
    }

    onAdd(text.trim(), priority);
    setText("");
    setPriority("normalny");
    setTouched(false);
  };

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div>
        <label htmlFor="todo-text">Treść zadania</label>
        <input
          id="todo-text"
          type="text"
          value={text}
          onChange={(event) => setText(event.target.value)}
          onBlur={() => setTouched(true)}
          aria-invalid={showError}
          aria-describedby={showError ? "todo-text-error" : undefined}
        />
        {showError && (
          <div id="todo-text-error" role="alert">
            {error}
          </div>
        )}
      </div>

      <div>
        <label htmlFor="todo-priority">Priorytet</label>
        <select
          id="todo-priority"
          value={priority}
          onChange={(event) => setPriority(event.target.value as Priority)}
        >
          <option value="niski">niski</option>
          <option value="normalny">normalny</option>
          <option value="wysoki">wysoki</option>
        </select>
      </div>

      <button type="submit">Dodaj</button>
    </form>
  );
}
