import axios from "axios";
import { useEffect, useState } from "react";

const Edit = ({ person }) => {
  const [fullName, setFullName] = useState("");
  const [age, setAge] = useState(0);
  const [occupation, setOccupation] = useState("");
  const [nickname, setNickname] = useState("");
  const [gender, setGender] = useState("");
  const [picture, setPicture] = useState("");

  useEffect(() => {
    setFullName(person.fullName);
    setAge(person.age);
    setOccupation(person.occupation);
    setNickname(person.nickname);
    setGender(person.gender);
    setPicture(person.picture);
  }, []);

  async function handleSubmit(event) {
    event.preventDefault();
    const data = {
      fullName: fullName,
      age: age,
      occupation: occupation,
      nickname: nickname,
      gender: gender,
      picture: picture,
    };

    const form = event.currentTarget;
    const fileInput = Array.from(form.elements).find(
      ({ name }) => name === "file"
    );

    const formData = new FormData();

    for (const file of fileInput.files) {
      formData.append("file", file);
    }
    formData.append("upload_preset", "datasketch");

    try {
      const res = await axios.post(
        `https://api.cloudinary.com/v1_1/ddxtma8ag/image/upload`,
        formData
      );

      setPicture(res.secure_url);
    } catch (error) {
      console.log(error);
    }

    try {
      const res = await axios.put(
        `http://localhost:3001/people/${person.id}`,
        data
      );
    } catch (error) {
      alert("ha ocurrido un error");
    }
  }

  return (
    <>
      <div className="container__form__client">
        <h2>Edita Usuario</h2>
        <img src={picture} alt={fullName} />
        <form className="form__edit__client" onSubmit={handleSubmit}>
          <p>
            <input className="form-control" type="file" name="file" />
          </p>
          <div className="form-group form__edit__client__fullname">
            <label>Nombre Completo</label>
            <input
              className="form-control"
              type="text"
              defaultValue={fullName}
              onChange={(event) => {
                setFullName(event.currentTarget.value);
              }}
            ></input>
          </div>
          <div className="form-group form__edit__client__gender">
            <p>Genero</p>
            {/* #TODO poner un select en para que el usuario ponga el genero con el */}
            <select
              className="form-select"
              value={gender}
              onChange={(event) => {
                setGender(event.target.value);
              }}
            >
              <option value="Male">Masculino</option>
              <option value="Female">Femenino</option>
            </select>
          </div>
          <div className="form-group form__edit__client__age">
            <label>Edad</label>
            <input
              className="form-control"
              type="number"
              defaultValue={age}
              onChange={(event) => {
                setAge(event.currentTarget.value);
              }}
            ></input>
          </div>
          <div className="form-group form__edit__client__occupation">
            <label>Profesion</label>
            <input
              className="form-control"
              type="text"
              defaultValue={occupation}
              // onChange={handleChange}
              onChange={(event) => {
                setOccupation(event.currentTarget.value);
              }}
            ></input>
          </div>
          <div className="form-group form__edit__client__nickname">
            <label>Apodo</label>
            <input
              className="form-control"
              type="text"
              defaultValue={nickname}
              onChange={(event) => {
                setNickname(event.currentTarget.value);
              }}
            ></input>
          </div>
          <div className="form-group form__edit__client__picture">
            <label>Foto</label>
            <input
              className="form-control"
              type="url"
              defaultValue={picture}
            ></input>
            <p>{picture}</p>
          </div>

          <button className="btn btn-secondary" type="submit">
            Submit
          </button>
        </form>
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
