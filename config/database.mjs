import mysql from "mysql2";

const connection = mysql.createConnection({
    // host: "localhost",
    // user: "root",
    // password: "teste123",
    // database: "betasocial"

    // host: "db4free.net",
    // user: "wile9090",
    // password: "Swordft10!",
    // database: "betasocial"

    host: "bg9cascg4pxlrm8gtj7b-mysql.services.clever-cloud.com",
    user: "un3bxmnlyvxewy8g",
    password: "Regcb3fw8BBFH7A405Gc",
    database: "bg9cascg4pxlrm8gtj7b"
});

export default connection;