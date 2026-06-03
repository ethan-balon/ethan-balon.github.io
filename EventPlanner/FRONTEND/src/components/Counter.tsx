import { useState } from "react";
import type { JSX } from "react/jsx-runtime";

// Interface example
interface CounterProps {
  initialValue: number;
}

// Explicit return type (optional but shown)
function Counter({ initialValue }: CounterProps): JSX.Element {
  // Typed state
  const [count, setCount] = useState<number>(initialValue);

  // Typed event handler
  const handleClick = (): void => {
    setCount(count + 1);
  };

  return (
    <div>
      <h2>Counter</h2>
      <p>{count}</p>
      <button onClick={handleClick}>Increment</button>
    </div>
  );
}

export default Counter;
