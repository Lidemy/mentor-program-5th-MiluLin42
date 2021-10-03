import React, { useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import {
  clearAll,
  filterAll,
  filterDone,
  filterUndone,
} from "../redux/actions";
import { Div, Icon, Button} from "atomize";

const DisplayButton = styled.button`
  padding: 10px;
  border: none;
  cursor: pointer;
  background: white;

  &:hover {
    color: red;
  }
  & + & {
    margin-left: 8px;
  }
  ${(props) =>
    props.$active &&
    `
    height: 100%;
    border-left: 1px solid #adadad;
    border-right: 1px solid #adadad;
    background: #ffd9e6;
    transition: all 0.4s ease-in;
    color: #adadad;
    font-wieght: bold;
  `}
`;

const filters = [
  { name: "全部", action: filterAll() },
  { name: "已完成", action: filterDone() },
  { name: "未完成", action: filterUndone() },
];

const VisibilityFilters = () => {
  const dispatch = useDispatch();
  const [display, setDisplay] = useState(filters[0].name);

  const handleClearAll = () => {
    dispatch(clearAll());
    dispatch(filterAll());
    setDisplay(filters[0].name);
  };

  return (
    <Div d="flex" justify="center" h="3rem">
      <div>
        {filters.map((filter) => (
          <DisplayButton
            $active={display===filter.name}
            key={filter.name}
            onClick={() => {
              dispatch(filter.action);
              setDisplay(filter.name);
            }}
            display={filter.name}
          >
            {filter.name}
          </DisplayButton>
        ))}
      </div>
      <Button
        h="2.5rem"
        p={{ x: "1rem" }}
        textSize="body"
        textColor="warning700"
        hoverTextColor="danger700"
        bg="white"
        m={{ l: "3rem", t: "0.1rem" }}
        onClick={handleClearAll}
      >
        <Icon name="Alert" size="20px" />
        清空
      </Button>
    </Div>
  );
};

export default VisibilityFilters;
