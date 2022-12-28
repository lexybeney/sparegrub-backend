require("dotenv").config();
const express = require("express"); //the import
const app = express(); //create an instance
const { checkToken } = require("./middleware/auth");
const { addToLog } = require("./middleware/logging");
const asyncMySQL = require("./mysql/connection");
const checkDbStatus = require("./tests/sql");
const cors = require("cors");

//send cors in header
app.use(cors());

//check db status
checkDbStatus(asyncMySQL);

//middleware
app.use(express.static("public")); //handle static files
app.use(express.json()); //turns the body into an object

//utility middleware
app.use((req, res, next) => {
  req.asyncMySQL = asyncMySQL;
  next();
});

//logging middleware
app.use(addToLog);

//no auth needed
app.use("/create", require("./routes/create"));
app.use("/login", require("./routes/login"));

//auth needed
app.use("/read", checkToken, require("./routes/read"));
app.use("/update", checkToken, require("./routes/update"));
app.use("/logoff", checkToken, require("./routes/logoff"));
app.use("/delete", checkToken, require("./routes/delete"));

const port = process.env.PORT || 6001;
app.listen(port, () => {});
