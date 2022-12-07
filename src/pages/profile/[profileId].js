import PersonDetailCard from "../../components/PersonDetailCard";
import TasksCard from "../../components/TasksCard";
import Link from "next/link";

const PersonDetail = ({ person, tasks }) => {
  const listTask = tasks.filter((task) => task.personId === person.id);
  return (
    <>
      <div>
        <div>
          <PersonDetailCard person={person}></PersonDetailCard>
          <Link href={`/profile/${person.id}/edit`}>Editar perfil</Link>
        </div>
        {listTask.map((task) => (
          <TasksCard task={task} key={task.id}></TasksCard>
        ))}
      </div>
    </>
  );
};

export async function getServerSideProps({ params }) {
  const apiTasks = await fetch(`http://localhost:3001/tasks`, {
    method: "GET",
  });

  const tasks = await apiTasks.json();

  const apiPerson = await fetch(
    `http://localhost:3001/people/${params.profileId}`,
    {
      method: "GET",
    }
  );
  const person = await apiPerson.json();
  return {
    props: {
      person,
      tasks,
    },
  };
}

export default PersonDetail;
