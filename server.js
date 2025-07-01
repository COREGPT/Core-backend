import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Hello from CORE backend!");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
