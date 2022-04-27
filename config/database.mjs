import mysql from "mysql2";

const connection = mysql.createConnection({
    // host: "localhost",
    // user: "root",
    // password: "teste123",
    // database: "betasocial"

    host: "fdb29.awardspace.net",
    user: "3665578_beta",
    password: "Swordft10!",
    database: "3665578_beta"
});

export default connection;