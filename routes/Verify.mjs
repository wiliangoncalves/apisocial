import express from "express";
import jwt from "jsonwebtoken";
import database from "../config/database.mjs";

const Router = express.Router();

Router.get(("/:token"), (req, res) => {
    const {token} = req.params;

    jwt.verify(token, process.env.SECRET_KEY, function (err, decoded) {
        if (err) {
            console.log(err);
            res.send("Falha na verificação de e-mail, possivelmente o link é inválido ou expirou!");
        }
        else{
            const email = decoded.email;

            console.log("Email decoded", email);

            database.query(`SELECT * FROM users WHERE email = '${email}'`, (err, result) => {
                if(err){console.log("Erro no SELECT do Verify.mjs ", err)}

                const user = result.find(email => email) || "";
                const id = user.id;

                database.query(`UPDATE users SET isVerified = 1 WHERE id = '${id}'`);

                return res.send("<h1>A conta foi ativada!</h1>");
            });
        }
        
    });
});

export default Router;