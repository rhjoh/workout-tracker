const { MongoClient } = require("mongodb");

const mongoURI = process.env.MONGO_URI_WORKOUTAPP;
const client = new MongoClient(mongoURI);

const getExercises = async () => {
  try {
    await client.connect();
    const db = client.db("workout-app");
    const collection = db.collection("exercises");
    const collectionResult = await collection.find({}).toArray();
    return collectionResult;
  } catch (e) {
    console.error(e);
  }
};

module.exports = { getExercises };
