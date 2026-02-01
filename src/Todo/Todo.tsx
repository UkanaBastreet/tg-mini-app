import { useContext } from "react";
import { TodoForm } from "./TodoForm";
import TodoList from "./TodoList";
import TodoContext, { TodoContextProvider } from "./TodoContext";

const Todo = () => {
  const todo = useContext(TodoContext);

  return (
    <div className="todo">
      {todo && (
        <>
          <TodoForm add={todo.add} />
          <TodoList todos={todo.todos} deleteTodo={todo.remove} />
        </>
      )}
    </div>
  );
};

export const WrappedTodo = () => {
  return (
    <TodoContextProvider>
      <Todo />
    </TodoContextProvider>
  );
};

export interface iTodo {
  id: string;
  title: string;
  isDone: boolean;
  date: number;
}
