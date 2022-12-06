import Image from "next/image";

const PeopleDetailCard = ({ people }) => {
  return (
    <>
      <div className="people__card">
        <img
          className="people__card__picture"
          src={people.picture}
          alt={people.nickname}
        />
        <div className="people__card__body">
          <h5 className="people__card__body__title">{people.fullName}</h5>
          <p className="people__card__body__text">
            {people.age} años. {people.occupation}
          </p>
        </div>
      </div>
    </>
  );
};

export default PeopleDetailCard;
