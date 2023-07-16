import React, { useEffect, useState } from "react";
import EditTodo from "./EditTodo";

const ListToDos = () => {
  const [todos, setTodos] = useState([]);

  // get all todos
  const getAllTodos = async () => {
    try {
      const response = await fetch("http://localhost:8000/todos");
      const jsonData = await response.json();
      setTodos(jsonData);
    } catch (error) {
      console.error(error.message);
    }
  };

  // delete a todo
  const handleDelete = async (id) => {
    try {
      const deleteTodo = await fetch(`http://localhost:8000/todos/${id}`, {
        method: "DELETE",
      });
      console.log(deleteTodo);
      setTodos(todos.filter((todo) => todo.id !== id));
    } catch (error) {
      console.error(error.message);
    }
  };

  // useEffect to get all todos when the component mounts
  useEffect(() => {
    getAllTodos();
  }, []);

  return (
    <div>
      <table className="table mt-5">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Title</th>
            <th scope="col">Description</th>
            <th scope="col">Status</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {todos.map((todo) => (
            <tr key={todo.id}>
              <th scope="row">{todo.id}</th>
              <td>{todo.title}</td>
              <td>{todo.description}</td>
              <td>{todo.status}</td>
              <td className="d-flex align-items-center">
                <EditTodo todo={todo} />
                <button
                  onClick={() => handleDelete(todo.id)}
                  className="btn btn-danger"
                >
                  delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListToDos;
