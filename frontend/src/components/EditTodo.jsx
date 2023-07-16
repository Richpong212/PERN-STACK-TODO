import React, { useState } from "react";

const EditTodo = ({ todo }) => {
  const [input, setInput] = useState({
    title: todo.title,
    description: todo.description,
    status: todo.status,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdate = () => {
    // Logic to update the todo with the new values
    try {
      const body = { ...input };
      const response = fetch(`http://localhost:8000/todos/${todo.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      window.location = "/"; // refresh the page
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <>
      <button
        type="button"
        className="btn btn-warning mb-2 me-2"
        data-bs-toggle="modal"
        data-bs-target={`#id${todo.id}`}
      >
        Edit
      </button>

      <div className="modal" id={`id${todo.id}`}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">Modal Heading</h4>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
              ></button>
            </div>

            <div className="modal-body">
              <input
                type="text"
                className="form-control mb-3"
                name="title"
                value={input.title}
                onChange={handleInputChange}
              />
              <input
                type="text"
                className="form-control mb-3"
                name="description"
                value={input.description}
                onChange={handleInputChange}
              />
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

            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-success"
                onClick={handleUpdate}
              >
                Update
              </button>
              <button
                type="button"
                className="btn btn-danger"
                data-bs-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditTodo;
