import PeopleDetailCard from "../components/PeopleDetailCard";
import Link from "next/link";
import { useState } from "react";
import Head from "next/head";

function HomePage({ people }) {
  const [order, setOrder] = useState("mitoma");

  return (
    <>
      <Head>
        <title>Inicio</title>
      </Head>
      <div className="container__home">
        <h2> Pagina de Inicio</h2>

        <hr />
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
        </div>
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
