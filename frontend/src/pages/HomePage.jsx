import React from "react";
import InputTodo from "../components/InputTodo";
import ListToDos from "../components/ListToDos";

const HomePage = () => {
  return (
    <div className="container">
      <div className="text-center mt-3">
        <h1>PERN Stack Todo App</h1>
      </div>
      <InputTodo />
      <div>
        <ListToDos />
      </div>
    </div>
  );
};

export default HomePage;
