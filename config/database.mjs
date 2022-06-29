import mysql from "mysql2";

const connection = mysql.createConnection({
    // host: "localhost",
    // user: "root",
    // password: "teste123",
    // database: "betasocial"

    host: process.env.CLEVERHOST,
    user: process.env.CLEVERUSER,
    password: process.env.CLEVERPASS,
    database: process.env.CLEVERDB,
    uri: process.env.CLEVERURI
});

export default connection;
