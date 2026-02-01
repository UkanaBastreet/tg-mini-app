import type { iTodo } from "./Todo";

const TodoItem = ({
  todo,
  deleteTodo,
}: {
  todo: iTodo;
  deleteTodo: (id: string) => void;
}) => {
  return (
    <li className="TodoItem">
      <b>{todo.title}</b>
      <button onClick={() => deleteTodo(todo.id)}>x</button>
    </li>
  );
};

export default TodoItem;
