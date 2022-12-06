const PersonDetail = ({ person }) => {
  return <></>;
};

export async function getServerSideProps({ params }) {
  const apiPerson = await fetch(
    `http://localhost:3001/people/${params.personId}`,
    {
      method: "GET",
    }
  );
  const person = await apiPerson.json();
  return {
    path: {
      person,
    },
  };
}
