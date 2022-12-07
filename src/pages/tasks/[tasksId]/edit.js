import { useState } from "react";
import axios from "axios";

const Edit = ({ task }) => {
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [completed, setCompleted] = useState(task.completed);
  const [startDate, setStartDate] = useState(task.startDate);
  const [endDate, setEndDate] = useState(task.endDate);

  async function handleSubmit(event) {
    event.preventDefault();
    const data = new FormData();
    data.append("title", title);
    data.append("description", description);
    data.append("completed", completed);
    data.append("startDate", startDate);
    data.append("endDate", endDate);

    try {
      const res = await axios.put(
        `http://localhost:3001/tasks/${task.id}`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <div className="container__form__task">
        <h2>Modificar Tarea</h2>
        <form className="form__edit__task" onSubmit={handleSubmit}>
          <div className="form__edit__task__title">
            <label>Titulo</label>
            <input
              type="text"
              defaultValue={title}
              onChange={(event) => {
                setTitle(event.currentTarget.value);
              }}
            ></input>
          </div>
          <div className="form__edit__task__description">
            <label>Descripcion</label>
            <input
              type="text"
              defaultValue={description}
              onChange={(event) => {
                setDescription(event.currentTarget.value);
              }}
            ></input>
          </div>
          <div className="form__edit__task__completed">
            <label>completo</label>
            <input
              type="text"
              defaultValue={completed}
              onChange={(event) => {
                setCompleted(event.currentTarget.value);
              }}
            ></input>
          </div>
          <div className="form__edit__task__startDate">
            <label>fecha inicio</label>
            <input
              type="date"
              defaultValue={startDate}
              onChange={(event) => {
                setStartDate(event.currentTarget.value);
              }}
            ></input>
          </div>
          <div className="form__edit__task__endDate">
            <label>fecha fin</label>
            <input
              type="date"
              defaultValue={endDate}
              onChange={(event) => {
                setEndDate(event.currentTarget.value);
              }}
            ></input>
          </div>
          <button type="submit">Actualizar</button>
        </form>
      </div>
    </>
  );
};
export default Edit;

export async function getServerSideProps({ params }) {
  const apiTasks = await fetch(
    `http://localhost:3001/tasks/${params.tasksId}`,
    {
      method: "GET",
    }
  );

  const task = await apiTasks.json();

  return {
    props: {
      task,
    },
  };
}
