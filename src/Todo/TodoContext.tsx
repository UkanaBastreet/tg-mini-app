import { createContext, useState, type FC, type ReactNode } from "react";
import type { iTodo } from "./Todo";

interface TodoContextType {
  todos: iTodo[];
  add: (id: string) => void;
  remove: (id: string) => void;
  toggle: (id: string) => void;
}

const TodoContext = createContext<TodoContextType | undefined>(undefined);

export const TodoContextProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [todos, setTodos] = useState<iTodo[]>([]);

  function add(title: string) {
    const newTodo: iTodo = {
      id: todos.length.toString(),
      date: Date.now(),
      isDone: false,
      title,
    };
    setTodos([...todos, newTodo]);
  }

  function remove(id: string) {
    setTodos((todos) => {
      const newTodos: iTodo[] = todos.filter((todo) => todo.id !== id);
      return newTodos.map((todo, i) => ({ ...todo, id: i.toString() }));
    });
  }
  function toggle(id: string) {
    setTodos((todos) => {
      const newTodos: iTodo[] = todos.map((todo) =>
        todo.id === id ? { ...todo, isDone: !todo.isDone } : todo,
      );
      return newTodos;
    });
  }
  return (
    <TodoContext.Provider value={{ todos, add, remove, toggle }}>
      {children}
    </TodoContext.Provider>
  );
};

export default TodoContext;
