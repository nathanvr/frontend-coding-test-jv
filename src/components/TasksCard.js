const TasksCard = ({ task }) => {
  return (
    <>
      <div className="task__container">
        <div className="task__container__title">
          <h3>{task.title}</h3>
        </div>
        <div className="task__container__body">
          <p>{task.description}</p>
          <input type={"radio"} id="completed"></input>
        </div>
      </div>
    </>
  );
};
export default TasksCard;
