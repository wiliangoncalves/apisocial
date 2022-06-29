import mysql from "mysql2";

const connection = mysql.createConnection({
    // host: "localhost",
    // user: "root",
    // password: "teste123",
    // database: "betasocial"

    // host: process.env.CLEVERHOST,
    // user: process.env.CLEVERUSER,
    // password: process.env.CLEVERPASS,
    // database: process.env.CLEVERDB,
    // uri: process.env.CLEVERURI

    host: "bg9cascg4pxlrm8gtj7b-mysql.services.clever-cloud.com",
    user: "un3bxmnlyvxewy8g",
    password: "Regcb3fw8BBFH7A405Gc",
    database: "bg9cascg4pxlrm8gtj7b",
    uri: "mysql://un3bxmnlyvxewy8g:Regcb3fw8BBFH7A405Gc@bg9cascg4pxlrm8gtj7b-mysql.services.clever-cloud.com:3306/bg9cascg4pxlrm8gtj7b"
});

export default connection;
