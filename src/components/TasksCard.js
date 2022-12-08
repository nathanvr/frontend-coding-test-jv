import Link from "next/link";
import { Icon } from "@iconify/react";

const TasksCard = ({ task }) => {
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
          <input type={"radio"} id="completed"></input>
        </div>
      </div>
    </>
  );
};
export default TasksCard;
