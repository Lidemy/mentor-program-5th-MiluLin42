import React from "react";
import styled from "styled-components";
import AddTodo from "./components/AddTodo";
import Todo from "./components/Todo";
import VisibilityFilters from "./components/VisibilityFilters";

const Wrapper = styled.div`
  width: 500px;
  margin: 0 auto;
  border: 1px solid #808080;
  border-radius: 8px;
  box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2);
`;

const Title = styled.h1`
  display: flex;
  color: #2894ff;
  align-items: center;
  justify-content: center;
`;

export default function App() {
  return (
    <Wrapper>
      <Title>Todo List</Title>
      <AddTodo />
      <Todo />
      <VisibilityFilters />
    </Wrapper>
  );
}
