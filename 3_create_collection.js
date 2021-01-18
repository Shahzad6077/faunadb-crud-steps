const dotenv = require("dotenv");
const faunadb = require("faunadb"),
  q = faunadb.query;
dotenv.config();

(async () => {
  if (process.env.FAUNADB_ADMIN_SECRET) {
    console.log("Creating DB-> key.....");

    const client = new faunadb.Client({
      secret: process.env.FAUNADB_SERVER_SECRET,
    });

    //create database
    try {
      var result = await client.query(
        q.CreateCollection({
          name: "products",
        })
      );
      console.log(result);
    } catch (error) {
      console.log("Unknow Error: ");
      console.log(error);
    }
  } else {
    console.log("No FAUNADB_ADMIN_SECRET in .env file, skipping DB setup");
  }
})();
