import {
  ADD_TODO,
  DELETE_TODO,
  TOGGLE_TODO,
  EDIT_TODO,
  CLEAR_ALL,
  FILTER_ALL,
  FILTER_DONE,
  FILTER_UNDONE,
} from "./actionTypes";

export const addTodo = (content) => ({
  type: ADD_TODO,
  payload: {
    content,
  },
});

export const deleteTodo = (id) => ({
  type: DELETE_TODO,
  payload: { id },
});

export const toggleTodo = (id) => ({
  type: TOGGLE_TODO,
  payload: { id },
});

export const editTodo = (id, content) => ({
  type: EDIT_TODO,
  payload: { id, content },
});

export const clearAll = (id) => ({
  type: CLEAR_ALL,
  payload: { id },
});

export function filterAll() {
  return {
    type: FILTER_ALL,
    payload: {
      filter: "all",
    },
  };
}

export function filterDone() {
  return {
    type: FILTER_DONE,
    payload: {
      filter: "done",
    },
  };
}

export function filterUndone() {
  return {
    type: FILTER_UNDONE,
    payload: {
      filter: "undone",
    },
  };
}
