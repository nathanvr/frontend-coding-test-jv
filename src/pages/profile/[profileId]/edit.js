import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Head from "next/head";
import { useRouter } from "next/router";

const Edit = ({ person }) => {
  const [fullName, setFullName] = useState("");
  const [age, setAge] = useState();
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
  const router = useRouter();

  const handleClick = () => {
    router.push(`http://localhost:3000/profile/${person.id}`);
  };
  const handlePicture = async (event) => {
    const formData = new FormData();
    const file = event.target.files[0];
    formData.append("file", file);

    formData.append("upload_preset", "datasketch");

    try {
      const res = await axios.post(
        `https://api.cloudinary.com/v1_1/ddxtma8ag/image/upload`,
        formData
      );
      setPicture(res.data.secure_url);
      if (res.status === 200) {
        toast.success("Imagen cargada correctamente", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    } catch (error) {
      toast.error("Error al cambiar el estado de la Tarea", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };
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

    // const form = event.currentTarget;
    // const fileInput = Array.from(form.elements).find(
    //   ({ name }) => name === "file"
    // );

    // const formData = new FormData();

    // for (const file of fileInput.files) {
    //   formData.append("file", file);
    // }
    // formData.append("upload_preset", "datasketch");

    // try {
    //   const res = await axios.post(
    //     `https://api.cloudinary.com/v1_1/ddxtma8ag/image/upload`,
    //     formData
    //   );
    //   console.log(res.secure_url);
    //   setPicture(res.data.secure_url);
    // } catch (error) {
    //   console.log(error);
    // }

    try {
      const res = await axios.put(`http://localhost:3001/people/${person.id}`, {
        fullName: fullName,
        age: age,
        occupation: occupation,
        nickname: nickname,
        gender: gender,
        picture: picture,
      });
      if (res.status === 200) {
        toast.success("Perfil actualizado Correctamente", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    } catch (error) {
      toast.error("Error al cambiar el estado de la Tarea", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  }

  return (
    <>
      <Head>
        <title>Editar Perfil</title>
      </Head>
      <div className="container__form__client">
        <h2>Editar Perfil</h2>
        <img src={picture} alt={fullName} />
        <form className="form__edit__client" onSubmit={handleSubmit}>
          <p>
            <input
              className="form-control"
              type="file"
              name="file"
              onChange={handlePicture}
            />
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
          <div className="form__edit__client__buttons">
            <button
              className="btn btn-secondary"
              type="button"
              onClick={handleClick}
            >
              Cancelar y regresar
            </button>

            <button className="btn btn-success" type="submit">
              Actualizar
            </button>
          </div>
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
