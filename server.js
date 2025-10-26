import express from "express";
import userRouter from "./routes/authentication/signUp.js";
import cors from "cors";
import connectdb from "./db/dbConnect.js";

const PORT = 8000;
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/", userRouter);

app.get("/", (req, res) => {
  res.send(`The server is live at http://localhost:${PORT}`);
});

app.listen(PORT, async () => {
  console.log(`The server is live at http://localhost:${PORT}`);
  await connectdb();
});

export default app;
