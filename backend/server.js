const writeWorkout = require("./methods/newWorkout");
const getExerciseList = require("./methods/getExercises");
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

app.get("/getExerciseList", async (req, res) => {
  const exerciseResults = await getExerciseList.getExercises();

  res.json(exerciseResults);
});

app.listen(8000);
