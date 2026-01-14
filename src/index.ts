import express from "express";

const app = express();

app.use(express.json());


app.get("/", (req, res) => {
  return res.json({ message: "Hello World!" });
});

app.listen(3030, () => {
  console.log("Server is running on port 3030");
});
