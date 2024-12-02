import express from "express";
import bodyParser from "body-parser";
import mysql from "mysql2";

const app = express();
const port = 3000;

app.use(bodyParser.json());

const con = mysql.createConnection({
  host: "nodejs-technical-test.cm30rlobuoic.ap-southeast-1.rds.amazonaws.com",
  user: "candidate",
  password: "NoTeDeSt^C10.6?SxwY882}",
  database: "conqtvms_dev",
});

con.connect((err) => {
  if (err) throw err;
  // console.log("connected");
});

app.get("/products", (req, res) => {
  let { searchFields, searchBy, orderBy, orderDir, currentPage, pageSize } =
    req.query;

  if (
    !(
      searchFields ||
      searchBy ||
      orderBy ||
      orderDir ||
      currentPage ||
      pageSize
    )
  ) {
    orderBy = "createdAt";
    orderDir = "DESC";
    pageSize = 10;

    con.query(
      `SELECT * FROM ProductV2 ORDER BY ${orderBy} ${orderDir} LIMIT ${pageSize}`,
      (err, results, fields) => {
        if (err) throw err;
        // console.log(results);
        let output = {
          currentPage: currentPage || 1,
          pageSize: pageSize || 10,
          totalPages: 3,
          totalCount: 25,
          data: results,
        };
        res.send(output);
      }
    );
  } else {
    con.query(
      `SELECT * FROM ProductV2 WHERE ${searchFields} = '${searchBy}' ORDER BY ${orderBy} ${orderDir} LIMIT ${pageSize}`,
      (err, results, fields) => {
        if (err) throw err;
        // console.log(results);
        let output = {
          currentPage: currentPage || 1,
          pageSize: pageSize || 10,
          totalPages: 3,
          totalCount: 25,
          data: results,
        };
        res.send(output);
      }
    );
  }
});

app.listen(port, () => {
  console.log(`server running at port http://localhost:${port}/products`);
});

//default values
// - `pageSize`: 10
// - `currentPage`: 1
// - `orderBy`: 'createdAt'
// - `orderDir`: 'desc'
// - `searchBy`: ""
// - `searchFields`: []
