require("dotenv").config();
const express = require("express"); //the import
const app = express(); //create an instance
const { simpsons } = require("./data/simpsons");
const { checkToken } = require("./middleware/auth");
const { getUniqueId } = require("./utils");
const { addToLog } = require("./middleware/logging");
const asyncMySQL = require("./mysql/connection");
const checkDbStatus = require("./tests/sql");

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

//route middleware
app.use("/delete", checkToken, require("./routes/delete"));
app.use("/read", require("./routes/read"));
app.use("/create", require("./routes/create"));
app.use("/update", checkToken, require("./routes/update"));
app.use("/login", require("./routes/login"));
app.use("/logoff", require("./routes/logoff"));

const port = process.env.PORT || 6001;
app.listen(port, () => {});
