import request from "../utils/request";

export const getTodos = () => request.get("/todos");
export const getTodo = (id) => request.get(`/todos/${id}`);
export const addTodo = (todo) => request.post("/todos", todo);
export const updateTodo = (id, todo) => request.put(`/todos/${id}`, todo);
export const deleteTodo = (id) => request.delete(`/todos/${id}`);