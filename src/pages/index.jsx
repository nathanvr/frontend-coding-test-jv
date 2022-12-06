import PeopleDetailCard from "../components/PeopleDetailCard";
import Link from "next/link";
function HomePage({ people }) {
  return (
    <>
      <div className="container">
        <h1> Pagina de Inicio</h1>
        <hr />
        <div className="d-flex flex-column">
          {people
            .sort((a, b) => a.age - b.age)
            .map((person) => (
              <Link key={person.id} href={`/profile/${person.id}`}>
                <PeopleDetailCard
                  people={person}
                  key={person.id}
                ></PeopleDetailCard>
              </Link>
            ))}
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps({}) {
  const apiPeople = await fetch(`http://localhost:3001/people`, {
    method: "GET",
  });

  const people = await apiPeople.json();
  return {
    props: {
      people,
    },
  };
}

export default HomePage;
