import express from "express";
import jwt from "jsonwebtoken";

const Login = express();

import db from "../config/database.mjs";

Login.post("/", (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    
    if(email.length < 5 || email.trim() == ""){
        return res.status(400).send({
            message: "Por favor, preencha o E-mail corretamente!",
            status: res.statusCode
        });
    };
    if(password.length < 5 || password.trim() == ""){
        return res.status(400).send({
            message: "Por favor, preencha a senha corretamente!",
            status: res.statusCode
        });
    };
    
    db.query(`SELECT * FROM users WHERE email = '${email}'`, (err, result) => {
        if(err){console.log("Deu erro!")};
        
        const user = result.find(email => email) || "";

        if(password !== user.password){
            return res.status(400).send({
                message: "Senha incorreta!",
                auth: false,
                token: null,
                status: res.statusCode
            });
        }

        if(email === user.email && password === user.password){
            const id = user.id;
            const token = jwt.sign({id}, process.env.SECRET_KEY, {
                expiresIn: 900 // 5min,
            });

            return res.status(200).send({
                message: "Login.mjs foi!",
                auth: true,
                token: token,
                status: res.statusCode
            });
        };

    });
});

export default Login;