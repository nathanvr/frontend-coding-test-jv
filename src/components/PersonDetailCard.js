const PersonDetailCard = ({ person }) => {
  return (
    <>
      <div className="person__card">
        <img
          className="person__card__picture"
          src={person.picture}
          alt={person.name}
        />
        <div className="person__card__body">
          <h5 className="person__card__body__name">
            {person.fullName}, Alias {person.nickname}
          </h5>

          <p className="person__card__body__occupation">
            {person.gender}, {person.age} años. {person.occupation}
          </p>
        </div>
      </div>
    </>
  );
};

export default PersonDetailCard;
