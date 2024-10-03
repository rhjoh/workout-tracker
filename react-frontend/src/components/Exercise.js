import React from "react";

const Exercise = ({ exerciseIndex, exercise, updateExercise }) => {
  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const updatedSets = [...exercise.setData];

    const todaysDate = new Date().toISOString().slice(0, 10);

    updatedSets[index] = {
      ...updatedSets[index], // We are setting updatedSets[index] to updatedSets[index], copying it.
      [name]: value, // here we update it, [name] coule be reps, or weight, depending on the event target ()
    };
    updateExercise(exerciseIndex, {
      exerciseID: exercise.exerciseID,
      exerciseDate: todaysDate,
      setData: updatedSets,
    });
  };

  const addSetButton = () => {
    const updatedSets = [...exercise.setData, { reps: 0, weight: 0 }];
    updateExercise(exerciseIndex, {
      ...exercise,
      setData: updatedSets,
    });
  };

  const subSetButton = () => {
    const updatedSets = [...exercise.setData];
    updatedSets.splice(-1);
    updateExercise(exerciseIndex, {
      ...exercise,
      setData: updatedSets,
    });
  };

  const printData = () => {
    console.log(exercise);
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
      <button onClick={printData}>Test</button>
      <button id="addSetButton" onClick={addSetButton}>
        Add set
      </button>
      <button id="subSetButton" onClick={subSetButton}>
        Subtract set
      </button>
    </div>
  );
};

export default Exercise;
