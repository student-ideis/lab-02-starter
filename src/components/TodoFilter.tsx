import type { Filter } from "../types";

type TodoFilterProps = {
  filter: Filter;
  counts: Record<Filter, number>;
  onFilterChange: (value: Filter) => void;
  onClearCompleted: () => void;
};

const filters: Filter[] = ["wszystkie", "aktywne", "zrobione"];

export default function TodoFilter({
  filter,
  counts,
  onFilterChange,
  onClearCompleted,
}: TodoFilterProps) {
  const doneCount = counts.zrobione;

  return (
    <div>
      {filters.map((option) => (
        <button
          key={option}
          type="button"
          className={filter === option ? "primary" : ""}
          aria-pressed={filter === option}
          onClick={() => onFilterChange(option)}
        >
          {option} ({counts[option]})
        </button>
      ))}

      {doneCount > 0 && (
        <button type="button" onClick={onClearCompleted}>
          Usuń zrobione ({doneCount})
        </button>
      )}
    </div>
  );
}
