import React from "react";

const Exercise = ({ exerciseIndex, exercise, updateExercise }) => {
  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const updatedSets = [...exercise.setData];

    updatedSets[index] = {
      ...updatedSets[index], // We are setting updatedSets[index] to updatedSets[index], copying it.
      [name]: value, // here we update it, [name] coule be reps, or weight, depending on the event target ()
    };
    updateExercise(exerciseIndex, {
      exerciseName: exercise.exerciseName,
      setData: updatedSets,
    });
  };

  return (
    <div>
      <form>
        <label>{exercise.exerciseName}</label>
        <br />
        {exercise.setData.map((set, index) => (
          <div key={index}>
            <h3>Set {index + 1}</h3>
            <label htmlFor={`reps${index}`}>Reps</label>
            <input
              type="text"
              id={`reps${index}`}
              name="reps"
              onChange={(e) => handleInputChange(e, index)}
            />
            <label htmlFor={`weight${index}`}>Weight</label>
            <input
              type="text"
              id={`weight${index}`}
              name="weight"
              onChange={(e) => handleInputChange(e, index)}
            />
            <br />
          </div>
        ))}
      </form>
    </div>
  );
};

export default Exercise;
