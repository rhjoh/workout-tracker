import { useEffect, useState } from "react";
import NewWorkout from "./components/NewWorkout";

function App() {
  const [myState, setMyState] = useState("home"); // basic navigation state before implementing reactrouter etc
  const [exerciseList, setExerciseList] = useState([]);

  useEffect(() => {
    const getExerciseList = () => {
      fetch("http://localhost:8000/getExerciseList")
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          setExerciseList(data);
        });
    };

    getExerciseList();
  }, []);

  return (
    <div className="app">
      {myState === "home" && exerciseList.length > 0 ? (
        <NewWorkout exerciseList={exerciseList} />
      ) : null}
    </div>
  );
}

export default App;
