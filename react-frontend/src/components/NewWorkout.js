import Exercise from "./Exercise";
import React, { useEffect, useState } from "react";

const NewWorkout = () => {
  const [newExerciseName, setExerciseName] = useState("benchpress");
  const [workoutData, setWorkoutData] = useState([]);

  const todaysDate = new Date().toISOString().slice(0, 10);
  console.log(todaysDate);

  const handleExerciseChange = (event) => {
    setExerciseName(event.target.value);
  };

  const addExercise = () => {
    const newExercise = {
      exerciseName: newExerciseName,
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
    fetch("http://localhost:8000/test", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(workoutData),
    })
      .then((response) => {
        console.log(response.status);
        return response.json();
      })
      .then((data) => {
        console.log(data);
      })
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
        name="newExerciseName"
        id="exercise-name-select"
        onChange={handleExerciseChange}
      >
        <option value="benchpress">Bench Press</option>
        <option value="dumbbell-curl">Dumbbell Curl</option>
        <option value="barbell-squat">Barbell Squat</option>
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
