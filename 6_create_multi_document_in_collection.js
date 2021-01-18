const dotenv = require("dotenv");
const faunadb = require("faunadb"),
  q = faunadb.query;
dotenv.config();

(async () => {
  if (process.env.FAUNADB_ADMIN_SECRET) {
    console.log("Creating Multiple Documents.....");

    const client = new faunadb.Client({
      secret: process.env.FAUNADB_SERVER_SECRET,
    });

    //create database
    try {
      // CREATE DOCUMENT WITH DEFAULT ID CREATED.
      var result = await client.query(
        q.Map(
          [
            {
              name: "Men Shoe 456",
              price: 5467,
              stock_qty: 34,
            },
            {
              name: "Women Shoe 78",
              price: 2345,
              stock_qty: 1,
            },
            {
              name: "Mixed Shoes 888",
              price: 1222,
              stock_qty: 51,
            },
          ],
          q.Lambda(
            "data",
            q.Create("products", {
              data: q.Var("data"),
            })
          )
        )
      );

      result.map((o) => {
        console.log(o.ref.id);
      });
    } catch (error) {
      console.log("Unknow Error: ");
      console.log(error);
    }
  } else {
    console.log("No FAUNADB_ADMIN_SECRET in .env file, skipping DB setup");
  }
})();
