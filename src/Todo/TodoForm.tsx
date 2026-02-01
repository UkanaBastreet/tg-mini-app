import { useState } from "react";

export const TodoForm = ({ add }: { add: (title: string) => void }) => {
  const [title, setTitle] = useState("");
  function handleAdd() {
    add(title);
  }
  return (
    <div className="todo-form">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button onClick={handleAdd}>add</button>
    </div>
  );
};
