import Image from "next/image";

const PeopleDetailCard = ({ people }) => {
  return (
    <>
      <div className=" card w-25 m-10">
        <img
          className="card-img-top"
          src={people.picture}
          alt={people.nickname}
        />
        <div className="card-body">
          <h5 className="card-title">{people.fullName}</h5>
          <p className="card-text">
            {people.age} años. {people.occupation}
          </p>
        </div>
      </div>
    </>
  );
};

export default PeopleDetailCard;
