import { useState, type ChangeEvent } from "react";
import type { JSX } from "react/jsx-runtime";

// Type alias example
type TodoItem = string;

function Todo(): JSX.Element {
  // Typed state
  const [items, setItems] = useState<TodoItem[]>([]);
  const [input, setInput] = useState<string>("");

  // Typed event handler
  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setInput(e.target.value);
  };

  const addItem = (): void => {
    if (input.trim() === "") return;

    setItems([...items, input]);
    setInput("");
  };

  return (
    <div>
      <h2>Todo List</h2>

      <input value={input} onChange={handleChange} />
      <button onClick={addItem}>Add</button>

      <ul>
        {items.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

export default Todo;
