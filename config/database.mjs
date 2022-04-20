import mysql from "mysql2";

const connection = mysql.createConnection({
    // host: "localhost",
    // user: "root",
    // password: "teste123",
    // database: "betasocial"
    host: "db4free.net",
    user: "wile9090",
    password: "Swordft10!",
    database: "betasocial"
});

export default connection;