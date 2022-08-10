const express = require("express");
const mongoose = require("mongoose");
const authRoute = require("./Routes/Auth");
const userRoute=require('./Routes/Users')
const MovieRoute=require('./Routes/Movies')
const ListRoute=require('./Routes/Lists')

const app = express();

const dotenv = require("dotenv");

dotenv.config();

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("connected"))
  .catch((err) => console.log(err));

app.use(express.json());

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/movies", MovieRoute);
app.use("/api/lists", ListRoute);

app.listen(3000, () => {
  console.log("Backend Server listening on port 3000!");
});

//Run app, then load http://localhost:3000 in a browser to see the output.
