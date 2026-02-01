import type { iTodo } from "./Todo";
import TodoItem from "./TodoItem";

const TodoList = ({
  todos,
  deleteTodo,
}: {
  todos: iTodo[];
  deleteTodo: (id: string) => void;
}) => {
  return (
    <div className="todo-list">
      <ol>
        {todos.map((todo) => (
          <TodoItem key={todo.id} todo={todo} deleteTodo={deleteTodo} />
        ))}
      </ol>
    </div>
  );
};

export default TodoList;
