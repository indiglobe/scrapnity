import { env } from "@/utils/env";
import mysql from "mysql2";

const url = new URL(env.DATABASE_URL);

const databaseName = url.pathname.split("/")[1];

const con = mysql.createConnection({
  host: url.hostname,
  user: url.username,
  password: url.password,
  port: Number(url.port),
  multipleStatements: true,
});

con.connect((err) => {
  if (err) {
    console.error(err);
    throw err;
  }

  console.log("Connected to MySQL Server!");

  const resetDbQuery = `
    DROP DATABASE IF EXISTS \`${databaseName}\`;
    CREATE DATABASE \`${databaseName}\`;
  `;

  // eslint-disable-next-line no-shadow
  con.query(resetDbQuery, (err) => {
    if (err) throw err;

    console.log(
      `Database '${databaseName}' dropped and recreated successfully.`,
    );
    console.log("Fresh database ready 🚀");

    con.end();
  });
});
