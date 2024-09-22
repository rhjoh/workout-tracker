import Exercise from "./Exercise";
import React, { useEffect, useState } from "react";

const NewWorkout = ({ exerciseList }) => {
  const [selectedExercise, setSelectedExercise] = useState({});
  const [workoutData, setWorkoutData] = useState([]);

  const handleExerciseChange = (event) => {
    const selectedExerciseID = event.target.selectedOptions[0].dataset.id;
    const selectedExerciseName = event.target.selectedOptions[0].label;
    setSelectedExercise({ id: selectedExerciseID, name: selectedExerciseName });
  };

  const addExercise = () => {
    console.log("Selected: ", selectedExercise.id);
    const newExercise = {
      exerciseID: selectedExercise.id,
      exerciseName: selectedExercise.name, // Only used for the label in the Exercise component, lingers in the final POSTed data
      setData: Array(3).fill({ reps: 0, weight: 0 }),
    };
    setWorkoutData((prevWorkoutData) => [...prevWorkoutData, newExercise]);
  };

  // State setter to pass to child component
  const updateExercise = (index, updatedExerciseData) => {
    setWorkoutData((prevWorkoutData) => {
      const updatedWorkoutData = [...prevWorkoutData];
      updatedWorkoutData[index] = updatedExerciseData;
      return updatedWorkoutData; // Explicit return required here
    });
  };

  const submitWorkout = () => {
    console.log(workoutData);
    fetch("http://localhost:8000/submitworkout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(workoutData),
    })
      .then((response) => {
        console.log(response.status);
        return response; // use response.json() if expecting a JSON payload in response
      })
      /*       .then((data) => {
        console.log(data);
      }) */
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <h2>New Workout</h2>

      <select
        name="newExerciseSelect"
        id="exercise-name-select"
        onChange={handleExerciseChange}
      >
        <option disabled selected hidden>
          Choose Exercise...
        </option>
        {exerciseList.length > 0
          ? exerciseList.map((item, index) => (
              <option key={index} data-id={item._id}>
                {item.name}
              </option>
            ))
          : null}
      </select>
      <button onClick={addExercise}>Add Exercise</button>
      {workoutData.map((item, index) => (
        <Exercise
          key={index}
          exerciseIndex={index}
          defaultSetCount={3}
          exercise={item}
          updateExercise={updateExercise}
        />
      ))}
      <br />
      {workoutData.length > 0 ? (
        <button onClick={submitWorkout}>Finish Workout</button>
      ) : null}
    </div>
  );
};

export default NewWorkout;
