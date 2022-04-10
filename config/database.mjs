import mysql from "mysql2";

const connection = mysql.createConnection({
    host: "sql10.freemysqlhosting.net",
    user: "sql10484599",
    password: "yx3dPRLzD1",
    database: "sql10484599"
});

export default connection;