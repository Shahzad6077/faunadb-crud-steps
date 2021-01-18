const dotenv = require("dotenv");
const faunadb = require("faunadb"),
  q = faunadb.query;
dotenv.config();

(async () => {
  if (process.env.FAUNADB_ADMIN_SECRET) {
    console.log("Creating Document-> key.....");

    const client = new faunadb.Client({
      secret: process.env.FAUNADB_SERVER_SECRET,
    });

    //create database
    try {
      // CREATE DOCUMENT WITH DEFAULT ID CREATED.
      // var result = await client.query(
      //   q.Create(
      //     // q.Collection("products"), ->> you can pass reference of collection as well.
      //     "products",
      //     {
      //       data: {
      //         name: "Baby Shoe 123",
      //         price: 1200,
      //         stock_qty: 55,
      //       },
      //     }
      //     )
      //     );

      // CREATE DOCUMENT WITH SET ID
      // NOTE:  You can pass only number or numeric-string
      var result = await client.query(
        q.Create(q.Ref(q.Collection("products"), "3999999"), {
          data: {
            name: "Hoco Shoe 456",
            price: 8950,
            stock_qty: 5,
          },
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
