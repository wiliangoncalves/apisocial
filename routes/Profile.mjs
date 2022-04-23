import express from "express";
import database from "../config/database.mjs";
import jwt from "jsonwebtoken";

const Router = express.Router();

Router.get("/", (req, res) => {
    database.query(`SELECT * FROM users`, (err, result) => {
        if(err){console.log("Erro na query do get em Profile.mjs")};

        res.status(200).send(JSON.stringify({
            users: result
        }));
    });
});

Router.post("/", (req, res) => {
    const token = req.body.token;

    jwt.verify(token, process.env.SECRET_KEY, function(err, decoded) {
        if (err) return res.json({ 
            auth: false,
            message: 'Falha ao autenticar o Token. esse é do Profile.mjs'
        });

        // se tudo estiver ok, salva no request para uso posterior.
        req.userId = decoded.id;

        database.query(`SELECT * FROM users WHERE id = '${req.userId}'`, (err, result) => {
            if(err){
                console.log("Não foi achado nenhum usuário Profile.mjs!");
            }

            const user = result.find(user => user.user) || "";
            const profile = result.find(profile => profile.profile) || "";
            const avatar = result.find(avatar => avatar.avatar) || "";

            res.status(200).send(JSON.stringify({
                message: "Ok",
                auth: true,
                user: user.user,
                profile: profile.profile,
                status: res.statusCode,
                avatar: avatar.avatar
            }))
        });
        
    });

});

export default Router;