const dotenv = require("dotenv");
const faunadb = require("faunadb"),
  q = faunadb.query;
dotenv.config();

(async () => {
  if (process.env.FAUNADB_ADMIN_SECRET) {
    console.log("Creating DB-> key.....");

    const client = new faunadb.Client({
      secret: process.env.FAUNADB_ADMIN_SECRET,
    });

    //create database
    try {
      var result = await client.query(
        q.CreateKey({
          database: q.Database("mytestdatabase"),
          role: "server",
        })
      );
      console.log(result);
    } catch (error) {
      if (
        error.requestResult.statusCode === 400 &&
        error.message === "instance already exists"
      ) {
        console.log("Database with this name already exists");
      } else {
        console.log("Unknow Error: ");
        console.log(error);
      }
    }
  } else {
    console.log("No FAUNADB_ADMIN_SECRET in .env file, skipping DB setup");
  }
})();
