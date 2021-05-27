var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var session = require("express-session");
var cookieParser = require("cookie-parser");
var loginRouter = require("./routes/login");
var signRouter = require("./routes/signup");
var exerciseRouter = require("./routes/exercise");
var viewdataRouter = require("./routes/viewdata");
var pushupRouter = require("./routes/pushup");
var abdominalRouter = require("./routes/abdominal");
var squatRouter = require("./routes/squat");
var bmiRouter = require("./routes/bmi");
var sportRouter = require("./routes/sport");
var app = express();
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(
  session({
    secret: "asd123asd",
    resave: false,
    saveUninitilalized: true,
  })
);

app.use("/login", loginRouter);
app.use("/signup", signRouter);
app.use("/exercise", exerciseRouter);
app.use("/viewdata", viewdataRouter);
app.use("/pushup", pushupRouter);
app.use("/abdominal", abdominalRouter);
app.use("/squat", squatRouter);
app.use("/bmi", bmiRouter);
app.use("/sport", sportRouter);

module.exports = app;