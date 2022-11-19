const mysql = require("mysql");

const connection = mysql.createConnection({
  port: 3306,
  database: "waste-app",
  user: "root",
  password: "",
  host: "localhost",
});

connection.connect();

function asyncMySQL(query) {
  return new Promise((resolve, reject) => {
    connection.query(query, (error, results) => {
      if (error) {
        console.log(
          "Connection to server failed, check server is running",
          error
        );
        reject("SQL not accepted");
      }
      resolve(results);
    });
  });
}

module.exports = asyncMySQL;
