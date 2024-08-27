const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const userRoutes = require("./routes/userRoutes.js");

const { default: mongoose } = require("mongoose");

const app = express();

dotenv.config();

const MONGODB_CONNECTION = process.env.MONGO_URI;
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

mongoose
  .connect(MONGODB_CONNECTION)
  .then(() => {
    console.log("Database connected....");
    app.listen(PORT, () => {
      console.log("Server is running on port ", PORT);
    });
  })
  .catch((error) => console.log(error));

app.use("/api/users", userRoutes);


// Now the api to get all users will be http://localhost:5000/api/users