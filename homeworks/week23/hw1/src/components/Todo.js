import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteTodo, toggleTodo } from "../redux/actions";
import { selectTodos, selectFilters } from "../selectors";
import TodoItem from "./TodoItem";
import { Div } from "atomize";

export default function Todo() {
  const todos = useSelector(selectTodos);
  const filters = useSelector(selectFilters);
  const dispatch = useDispatch();
  const [inputToggle, setInputToggle] = useState(true);

  const handleToggleIsDone = (id) => {
    dispatch(toggleTodo(id));
  };

  const handleDeleteTodo = (id) => {
    dispatch(deleteTodo(id));
  };

  const handleEditClick = () => {
    setInputToggle(false);
  };

  const DISPLAY_MAP = {
    all: (todos) => todos,
    done: (todos) => todos.isDone,
    undone: (todos) => !todos.isDone,
  };

  return (
    <div>
      {todos && todos.length ? 
      (todos.filter(DISPLAY_MAP[filters]).map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          content={todo.content}
          handleToggleIsDone={handleToggleIsDone}
          handleEditClick={handleEditClick}
          handleDeleteTodo={handleDeleteTodo}
        />
      ))) : <Div d="flex" justify="center" p="2rem" border={{b: "1px solid"}}>Write a TO-DO list!</Div>}
    </div>
  );
}
