const { MongoClient } = require("mongodb");

const mongoURI = process.env.MONGO_URI_WORKOUTAPP;
const client = new MongoClient(mongoURI);

const writeWorkout = async (workoutData) => {
  try {
    await client.connect();

    const db = client.db("workout-app");
    const collection = db.collection("workouts");

    console.log(workoutData);
    await collection.insertMany(workoutData);
  } catch (e) {
    console.error(e);
  }
};

module.exports = { writeWorkout };
