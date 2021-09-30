import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addTodo } from "../redux/actions";
import { Div, Input, Button, Icon } from "atomize";

export default function AddTodo() {
  const [value, setValue] = useState("");
  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    setValue(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleButtonClick();
    }
  };

  const handleButtonClick = () => {
    if (value === "" || value.length > 20)
      return alert("請勿為空、文字請控制在 20 字元內");
    dispatch(addTodo(value));
    setValue("");
  };

  return (
    <Div d="flex" justify="center">
      <Input
        placeholder="新增 Todo～"
        type="text"
        value={value}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
      />
      <Button
        h="2.5rem"
        w="2.5rem"
        bg="white"
        hoverBg="danger400"
        rounded="lg"
        m={{ l: "1rem" }}
        onClick={handleButtonClick}
      >
        <Icon name="LongRight" size="20px" />
      </Button>
    </Div>
  );
}
