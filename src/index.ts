import express from "express";
import { Pessoa } from "./pessoa";

const app = express();

app.use(express.json());
const pessoa = new Pessoa("André", 36);

app.get("/", (req, res) => {
  return res.json({ message: "Hello World!", pessoa });
});

app.listen(3333, () => {
  console.log("Server is running on port 3333");
});
