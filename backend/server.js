const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

app.post("/test", (req, res) => {
  console.log("Got data on /test");
  const requestBody = req.body;
  console.log(requestBody);
  console.log(requestBody[0].setData);
  res.json("ok").status(200).end();
});

app.listen(8000);
