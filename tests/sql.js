checkDbStatus = async (asyncMySQL) => {
  try {
    const results = await asyncMySQL(`SHOW TABLES;`);
    if (results.length < 1) console.log("DB structure has an issue!");
  } catch (error) {
    console.log("mySQL error", error);
  }
};

module.exports = checkDbStatus;
