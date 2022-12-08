import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";

const Edit = ({ task }) => {
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [completed, setCompleted] = useState(task.completed);
  const [startDate, setStartDate] = useState(task.startDate);
  const [endDate, setEndDate] = useState(task.endDate);
  const router = useRouter();

  const time = Date.now();
  const hoy = new Date(time);

  useEffect(() => {
    if (endDate < hoy.toISOString().slice(0, 10)) {
      setCompleted("true");
    } else {
      setCompleted("false");
    }
  }, []);

  const handleClick = () => {
    router.push(`http://localhost:3000/profile/${task.personId}`);
  };

  async function handleSubmit(event) {
    event.preventDefault();
    const data = new FormData();
    data.append("title", title);
    data.append("description", description);
    data.append("completed", completed);
    data.append("startDate", startDate);
    data.append("endDate", endDate);
    data.append("personId", task.personId);

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

        <form className="form__edit__task " onSubmit={handleSubmit}>
          <div className="form__edit__task__title form-group">
            <label>Titulo</label>
            <input
              className="form-control"
              type="text"
              defaultValue={title}
              onChange={(event) => {
                setTitle(event.currentTarget.value);
              }}
            ></input>
          </div>
          <div className="form__edit__task__description form-group">
            <label>Descripcion</label>
            <input
              className="form-control"
              type="text"
              defaultValue={description}
              onChange={(event) => {
                setDescription(event.currentTarget.value);
              }}
            ></input>
          </div>

          <div className="form__edit__task__completed form-group">
            <label>completo</label>
            <input
              className="form-control"
              type="text"
              defaultValue={completed}
              onChange={(event) => {
                setCompleted(event.currentTarget.value);
              }}
            ></input>
          </div>
          <div className="form__edit__task__startDate form-group">
            <label>fecha inicio</label>
            <input
              className="form-control"
              type="date"
              defaultValue={startDate}
              onChange={(event) => {
                setStartDate(event.currentTarget.value);
              }}
            ></input>
          </div>
          <div className="form__edit__task__endDate form-group">
            <label>fecha fin</label>
            <input
              className="form-control"
              type="date"
              defaultValue={endDate}
              onChange={(event) => {
                setEndDate(event.currentTarget.value);
              }}
            ></input>
          </div>
          <div>
            <button
              className="btn btn-secondary"
              type="button"
              onClick={handleClick}
            >
              Cancelar y regresar
            </button>
            <button className="btn btn-success" type="submit">
              Actualizar
            </button>
          </div>
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
