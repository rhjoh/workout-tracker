import Exercise from "./Exercise";
import React, { useEffect, useState } from "react";

const NewWorkout = ({ exerciseList }) => {
  const [selectedExercise, setSelectedExercise] = useState({});
  const [workoutData, setWorkoutData] = useState([]);

  const todaysDate = new Date().toISOString().slice(0, 10);
  console.log(todaysDate);

  const handleExerciseChange = (event) => {
    const selectedExerciseID = event.target.selectedOptions[0].dataset.id;
    const selectedExerciseName = event.target.selectedOptions[0].label;
    setSelectedExercise({ id: selectedExerciseID, name: selectedExerciseName });
  };

  const addExercise = () => {
    console.log("Selected: ", selectedExercise.id);
    console.log(workoutData);
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
      console.log("Updated:", updatedWorkoutData); // State is still 1 step behind.
      return updatedWorkoutData; // Explicit return required here
    });
  };

  const submitWorkout = () => {
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

  useEffect(() => {
    console.log(workoutData);
  }, [workoutData]);

  return (
    <div>
      <h2>New Workout</h2>

      <select
        name="newExerciseSelect"
        id="exercise-name-select"
        onChange={handleExerciseChange}
      >
        {exerciseList.length > 0
          ? exerciseList.map((item, index) => (
              <option key={index} data-id={item.id} value={item.id}>
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
