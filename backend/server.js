const writeWorkout = require("./methods/newWorkout");
const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

app.post("/submitworkout", (req, res) => {
  console.log("Got data on /submitworkout");
  const requestBody = req.body;
  /*   console.log(requestBody[0].setData); */
  console.log(requestBody[0]);
  res.status(200).end();
  writeWorkout.writeWorkout();
});

app.get("/getExerciseList", (req, res) => {
  const exerciseList = [
    { id: 0, name: "Bench Press" },
    { id: 1, name: "Dumbbell Curl" },
    { id: 2, name: "Barbell Squat" },
  ];
  // This needs to be a method

  res.json(exerciseList);
});

app.listen(8000);
