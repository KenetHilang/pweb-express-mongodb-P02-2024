import express from "express";
import connectDB from "./db-connection";
import bookrouter from "./routes/book.route";
import authrouter from './routes/auth.route'
const app = express();

app.use(express.json());
connectDB();   
// check endpoint
app.get("/", (_, response) => {
  response.status(200).send("Server is up and running 💫");
});

app.use("/books", bookrouter);
app.use("/auth", authrouter);
const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Express is running on Port ${PORT}`);
});

