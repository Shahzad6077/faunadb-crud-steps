const hrstart = process.hrtime();
const hrend = process.hrtime(hrstart);
const dotenv = require("dotenv");
const faunadb = require("faunadb"),
  q = faunadb.query;
dotenv.config();

(async () => {
  if (process.env.FAUNADB_ADMIN_SECRET) {
    console.log("Get Document by Reference.....");

    const client = new faunadb.Client({
      secret: process.env.FAUNADB_SERVER_SECRET,
    });

    //create database
    try {
      // CREATE DOCUMENT WITH DEFAULT ID CREATED.
      const docRefs = q.Paginate(q.Match(q.Index("get_products")));

      var results = await client.query(
        q.Map(docRefs, q.Lambda("ref", q.Get(q.Var("ref"))))
      );
      // ----------

      // Search by name full text search
      // var results = await client.query(
      //   q.Map(
      //     q.Filter(
      //       docRefs,
      //       q.Lambda(
      //         "ref",
      //         q.ContainsStr(
      //           q.LowerCase(q.Select(["data", "name"], q.Get(q.Var("ref")))),
      //           "shoes"
      //         )
      //       )
      //     ),
      //     q.Lambda("ref", q.Get(q.Var("ref")))
      //   )
      // );

      console.info(
        "Execution time (hr): %ds %dms",
        hrend[0],
        hrend[1] / 1000000
      );
      results.data.map((o) => console.log(o.data));
    } catch (error) {
      console.log("Unknow Error: ");
      console.log(error);
    }
  } else {
    console.log("No FAUNADB_ADMIN_SECRET in .env file, skipping DB setup");
  }
})();
