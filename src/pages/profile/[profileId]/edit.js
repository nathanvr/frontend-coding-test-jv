const Edit = ({ person }) => {
  return (
    <>
      <div className="container__form__client">
        <h2>Edita Usuario</h2>
        <form className="form__edit__client"></form>
      </div>
    </>
  );
};
export default Edit;

export async function getServerSideProps({ params }) {
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
    },
  };
}
