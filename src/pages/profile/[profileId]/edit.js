import axios from "axios";
import { useState } from "react";

const Edit = ({ person }) => {
  const [fullName, setFullName] = useState(person.fullName);
  const [age, setAge] = useState(person.age);
  const [occupation, setOccupation] = useState(person.occupation);
  const [nickname, setNickname] = useState(person.nickname);
  const [gender, setGender] = useState(person.gender);
  const [picture, setPicture] = useState(person.picture);

  const [imageSrc, setImageSrc] = useState();
  const [uploadData, setUploadData] = useState();

  async function handleSubmit(event) {
    event.preventDefault();
    const data = new FormData();
    data.append("fullName", fullName);
    data.append("age", age);
    data.append("occupation", occupation);
    data.append("nickname", nickname);
    data.append("picture", picture);

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
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(res);
    } catch (error) {
      alert("ha ocurrido un error");
    }
  }

  return (
    <>
      <div className="container__form__client">
        <h2>Edita Usuario</h2>
        <form className="form__edit__client" onSubmit={handleSubmit}>
          <div className="form__edit__client__fullname">
            <label>nombre Completo</label>
            <input
              type="text"
              defaultValue={fullName}
              onChange={(event) => {
                setFullName(event.currentTarget.value);
              }}
            ></input>
            {fullName}
          </div>
          <div className="form__edit__client__gender">
            <p>Genero</p>
            {/* #TODO poner un select en para que el usuario ponga el genero con el */}
            <select
              value={gender}
              onChange={(event) => {
                setGender(event.target.value);
              }}
            >
              <option value="Male">Masculino</option>
              <option value="Female">Femenino</option>
            </select>
          </div>
          <div className="form__edit__client__age">
            <label>Edad</label>
            <input
              type="number"
              defaultValue={age}
              onChange={(event) => {
                setAge(event.currentTarget.value);
              }}
            ></input>
          </div>
          <div className="form__edit__client__occupation">
            <label>Profesion</label>
            <input
              type="text"
              defaultValue={occupation}
              // onChange={handleChange}
              onChange={(event) => {
                setOccupation(event.currentTarget.value);
              }}
            ></input>
          </div>
          <div className="form__edit__client__nickname">
            <label>Apodo</label>
            <input
              type="text"
              defaultValue={nickname}
              onChange={(event) => {
                setNickname(event.currentTarget.value);
              }}
            ></input>
          </div>
          <div className="form__edit__client__picture">
            <label>Foto</label>
            <input type="url" defaultValue={picture}></input>
            <p>{picture}</p>
            <p>
              <input type="file" name="file" />
            </p>

            <img src={imageSrc} />
          </div>

          <button type="submit">Submit</button>
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
