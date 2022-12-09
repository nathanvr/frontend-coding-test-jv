import PersonDetailCard from "../../components/PersonDetailCard";
import TasksCard from "../../components/TasksCard";
import Link from "next/link";
import Head from "next/head";
import Layout from "../../components/Layout";

const PersonDetail = ({ person, tasks }) => {
  const listTask = tasks.filter((task) => task.personId === person.id);
  return (
    <>
      <Head>
        <title>Detalle de perfil</title>
      </Head>
      <Layout>
        <div className="container__profile__detail">
          <div className="profile__detail__person">
            <Link href={`/profile/${person.id}/edit`}>
              <div className="profile__detail__person__link">Editar perfil</div>
            </Link>
            <PersonDetailCard person={person}></PersonDetailCard>
          </div>
          <div className="profile__detail__task">
            {listTask.map((task) => (
              <div key={task.id}>
                <TasksCard task={task}></TasksCard>
              </div>
            ))}
          </div>
        </div>
      </Layout>
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
