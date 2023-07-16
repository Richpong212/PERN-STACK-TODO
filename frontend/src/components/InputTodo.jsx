import React, { useState } from "react";

const InputTodo = () => {
  const [input, setInput] = useState({
    title: "",
    description: "",
    status: "",
  });

  const handleInputChange = (e) => {
    setInput((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const body = { ...input };
      const response = await fetch("http://localhost:8000/todos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      window.location = "/"; // refresh the page
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{}}
    >
      <form className="">
        <div
          style={{
            display: "flex",
            gap: "1rem",
            alignItems: "center",
          }}
        >
          <div>
            <input
              placeholder="title"
              type="text"
              className="form-control mb-3"
              name="title"
              value={input.title}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <input
              placeholder="description"
              type="text"
              className="form-control mb-3"
              name="description"
              value={input.description}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <select
              name="status"
              id=""
              value={input.status}
              onChange={handleInputChange}
            >
              <option value="">Status</option>
              <option value="Done">Done</option>
              <option value="Inprogress">Inprogress</option>
            </select>
          </div>
        </div>
        <button onClick={handleSubmit} className="btn btn-success mt-3">
          Create A Todo
        </button>
      </form>
    </div>
  );
};

export default InputTodo;
