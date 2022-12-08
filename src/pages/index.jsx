import PeopleDetailCard from "../components/PeopleDetailCard";
import Link from "next/link";
import { useState } from "react";
function HomePage({ people }) {
  const [order, setOrder] = useState("mitoma");

  return (
    <>
      <div className="container__home">
        <h1> Pagina de Inicio</h1>
        <div className="container__home__orderControl">
          <p>Ordenar de </p>
          <select
            value={order}
            onChange={(event) => {
              setOrder(event.target.value);
            }}
          >
            <option value="mitoma">menor a mayor</option>
            <option value="matomi">mayor a menor</option>
          </select>
          <p>{order}</p>
        </div>
        <hr />
        <div className="container__home__card">
          {order === "mitoma"
            ? people
                .sort((a, b) => a.age - b.age)
                .map((person) => (
                  <Link key={person.id} href={`/profile/${person.id}`}>
                    <PeopleDetailCard people={person}></PeopleDetailCard>
                  </Link>
                ))
            : people
                .sort((a, b) => b.age - a.age)
                .map((person) => (
                  <Link key={person.id} href={`/profile/${person.id}`}>
                    <PeopleDetailCard people={person}></PeopleDetailCard>
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
