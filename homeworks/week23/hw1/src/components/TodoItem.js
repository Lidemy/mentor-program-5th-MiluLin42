import React, { useState } from "react";
import styled from "styled-components";
import { toggleTodo, deleteTodo, editTodo } from "../redux/actions";
import { useDispatch } from "react-redux";
import { Div, Icon, Button, Input } from "atomize";

const TodoItemWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  border-bottom: 1px solid #adadad;
`;

const TodoContent = styled.div`
  color: #00bfff;
  ${(props) =>
    props.$isDone &&
    `
    text-decoration: line-through;
    color: #808080;
  `}
`;

export default function TodoItem({ todo }) {
  const [inputValue, setInputValue] = useState(todo.content);
  const [inputToggle, setInputToggle] = useState(true);
  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleUpdateClick();
    }
  };

  const handleUpdateClick = () => {
    if (inputValue === "" || inputValue.length > 20)
      return alert("請勿為空、文字請控制在 20 字元內");
    dispatch(editTodo(todo.id, inputValue));
    setInputToggle(true);
  };

  const handleToggleIsDone = () => {
    dispatch(toggleTodo(todo.id));
  };

  const handleDeleteTodo = () => {
    dispatch(deleteTodo(todo.id));
  };

  const handleEditClick = () => {
    setInputToggle(false);
  };

  return (
    <TodoItemWrapper>
      <Div onClick={handleToggleIsDone}>
        {todo.isDone ? (
          <Icon name="Checked" size="20px" />
        ) : (
          <Icon name="RBUnchecked" size="20px" />
        )}
      </Div>
      {inputToggle ? (
        <TodoContent $isDone={todo.isDone}>{todo.content}</TodoContent>
      ) : (
        <Input
          placeholder="編輯Todo"
          h="2rem"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
        />
      )}
      <Div d="flex">
        {inputToggle ? (
          <Button
            h="2rem"
            w="2rem"
            bg="success300"
            hoverBg="success400"
            rounded="lg"
            m={{ r: "1rem" }}
            onClick={handleEditClick}
          >
            <Icon name="Edit" size="20px" />
          </Button>
        ) : (
          <Button
            h="2rem"
            w="2rem"
            bg="success300"
            hoverBg="success400"
            rounded="lg"
            m={{ r: "1rem" }}
            onClick={handleUpdateClick}
          >
            <Icon name="EditSolid" size="20px" />
          </Button>
        )}
        <Button
          h="2rem"
          w="2rem"
          bg="danger700"
          hoverBg="danger600"
          rounded="circle"
          m={{ r: "1rem" }}
          shadow="2"
          hoverShadow="4"
          onClick={handleDeleteTodo}
        >
          <Icon name="DeleteSolid" size="20px" color="white" />
        </Button>
      </Div>
    </TodoItemWrapper>
  );
}
