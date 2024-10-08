import { useEffect, useState } from "react";
import Create from "./Create";
import axios from "axios";
import {
  BsCircleFill,
  BsFillCCircleFill,
  BsFillCheckCircleFill,
  BsFillTrashFill,
} from "react-icons/bs";

const Home = () => {
  const [todos, steTodos] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:3333/get")
      .then((result) => steTodos(result.data))
      .catch((err) => console.log(err));
  }, []);

  const handleEdit = (id) => {
    axios
      .put("http://localhost:3333/update/" + id)
      .then((result) => {
        location.reload()
      })
      .catch((err) => console.log(err));
  };

  const handleDelete = (id) => {
    axios.delete("http://localhost:3333/delete/" + id)
    .then((result) => {
        location.reload()
    })
    .catch((err => console.log(err)))
  }

  return (
    <div className="home">
      <h2>Todo List</h2>
      <Create />
      {todos.length === 0 ? (
        <div>
          <h2>No Record</h2>
        </div>
      ) : (
        todos.map((todo) => (
          <div className="task">
            <div className="checkbox" onClick={() => handleEdit(todo._id)}>
              {todo.done ? (
                <BsFillCheckCircleFill className="icon" />
              ) : (
                <BsCircleFill className="icon" />
              )}

              <p className={todo.done ? "line_through" : ""}>{todo.task}</p>
            </div>
            <div>
              <span>
            
                <BsFillTrashFill className="icon" onClick={() => handleDelete (todo._id)} />
              </span>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Home;
