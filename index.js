const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
var cookieParser = require("cookie-parser");

const studentRouter = require("./routes/router");

const app = express();
const port = process.env.PORT || 4000;

let corsOptions = {
  origin: ["http://localhost:4200"],
};

app.use(cors(corsOptions));
app.use(bodyParser.json());

app.use("/", studentRouter);

app.listen(port, () => {
  console.log("listening port==>", port);
});
