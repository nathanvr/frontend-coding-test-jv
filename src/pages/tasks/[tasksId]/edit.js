import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

const Edit = ({ task }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [completed, setCompleted] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [personId, setPersonId] = useState(0);
  const router = useRouter();

  const hoy = new Date();

  useEffect(() => {
    setTitle(task.title);
    setDescription(task.description);
    setCompleted(task.completed);
    setStartDate(task.startDate);
    setEndDate(task.endDate);
    setPersonId(task.personId);

    // if (hoy.toISOString().slice(0, 10) > endDate) {
    //   setCompleted(!completed);
    //   (async () => {
    //     const data = { ...task, completed: completed };
    //     try {
    //       const res = await axios.put(
    //         `http://localhost:3001/tasks/${task.id}`,
    //         data
    //       );
    //     } catch (error) {
    //       console.log(error);
    //     }
    //   })();
    // }
  }, []);

  const handleCheck = async () => {
    const data = { ...task, completed: !completed };

    try {
      const res = await axios.put(
        `http://localhost:3001/tasks/${task.id}`,
        data
      );
      if (res.status === 200) {
        toast.success("Cambio el estado de la Tarea", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    } catch (error) {
      toast.error("Error al cambiar el estado de la Tarea", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  const handleClick = () => {
    router.push(`http://localhost:3000/profile/${task.personId}`);
  };

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      const res = await axios.put(`http://localhost:3001/tasks/${task.id}`, {
        title: title,
        description: description,
        completed: completed,
        startDate: startDate,
        endDate: endDate,
        personId: personId,
      });
      if (res.status === 200) {
        toast.success("Actualizado Correctamente", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    } catch (error) {
      toast.error("Error al cambiar el estado de la Tarea", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  }

  return (
    <>
      <div className="container__form__task">
        <div>
          <h2>Modificar Tarea</h2>
          <input
            type="checkbox"
            id="completed"
            checked={completed}
            onClick={handleCheck}
            onChange={() => {
              setCompleted(!completed);
            }}
          ></input>
          {completed ? (
            <label>Marcar como incompleta </label>
          ) : (
            <label>Marcar como completa </label>
          )}
        </div>

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
              min={startDate}
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
