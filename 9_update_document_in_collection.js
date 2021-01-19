const dotenv = require("dotenv");
const faunadb = require("faunadb"),
  q = faunadb.query;
dotenv.config();

(async () => {
  if (process.env.FAUNADB_ADMIN_SECRET) {
    console.log("Update Document-> key.....");

    const client = new faunadb.Client({
      secret: process.env.FAUNADB_SERVER_SECRET,
    });

    //create database
    try {
      // Update DOCUMENT WITH DEFAULT ID CREATED.

      const docRef = q.Ref(q.Collection("products"), "3999999");
      var result = await client.query(
        q.Update(
          // q.Collection("products"), ->> you can pass reference of collection as well.
          docRef,
          {
            data: {
              price: 100001,
            },
          }
        )
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
