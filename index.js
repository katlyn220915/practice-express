import express from "express";
import morgan from "morgan";
import routes from "./routes/index.js";

const app = express(); //create instance of express module

app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms")
);
app.use(express.urlencoded({ extended: true }));
app.use(routes);

app.use(function (req, res) {
  res.status(404).send("Not found");
});

//this callback will trigger when any error occurr, it stands for middleware; err.stack is the formatted log of errors
app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).send(err.message);
});

app.listen(3000, function () {
  console.log("app listening on port 3000");
});
