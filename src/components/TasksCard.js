import Link from "next/link";
import { Icon } from "@iconify/react";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const TasksCard = ({ task }) => {
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    setCompleted(task.completed);
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
  return (
    <>
      <div className="task__container">
        <div className="task__container__title">
          <h5>{task.title}</h5>
          <Link href={`/tasks/${task.id}/edit`} legacyBehavior>
            <a className="btn btn-warning ">
              <Icon icon="material-symbols:edit" />
            </a>
          </Link>
        </div>
        <hr />

        <div className="task__container__body">
          <p>{task.description}</p>

          <div className="task__container__body__check">
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
        </div>
      </div>
    </>
  );
};
export default TasksCard;
