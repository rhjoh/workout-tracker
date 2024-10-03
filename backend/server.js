const writeWorkout = require("./methods/newWorkout");
const getExerciseList = require("./methods/getExercises");
const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

app.post("/submitworkout", async (req, res) => {
  console.log("Got data on /submitworkout");
  const requestBody = req.body;
  try {
    await writeWorkout.writeWorkout(requestBody);
    res.status(200).end();
  } catch (e) {
    console.error(e);
    res.status(500).end();
  }
});

app.get("/getExerciseList", async (req, res) => {
  const exerciseResults = await getExerciseList.getExercises();

  res.json(exerciseResults);
});

app.listen(8000);
