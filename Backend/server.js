require("dotenv").config();
const express = require("express");
const cors = require("cors");
const passport = require("passport");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const mongoose = require("mongoose");

const userRoutes = require("./routes/user-routes");

const app = express();

// MONGO DB SETUP
mongoose.set("strictQuery", true);
mongoose
  .connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  });

// MIDDLEWARE
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// SESSIONS
app.use(passport.initialize());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGODB_URL,
      mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true },
      collectionName: "sessions",
    }),
  })
);

// ROUTES

app.use("/user", userRoutes);

app.listen(4000, () => {
  console.log("Server is started on port " + 4000);
});
