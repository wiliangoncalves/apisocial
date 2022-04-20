import express from "express";
import database from "../config/database.mjs";
import jwt from "jsonwebtoken";

const Router = express.Router();

Router.post("/", (req, res) => {
    const newUser = req.body.newUser;
    const newProfile = req.body.newProfile;
    const token = req.body.token;


    jwt.verify(token, process.env.SECRET_KEY, function(err, decoded) {
        if (err) return res.json({ 
            auth: false,
            message: 'Falha ao autenticar o Token. esse é do Profile.mjs'
        });

        // se tudo estiver ok, salva no request para uso posterior.
        req.userId = decoded.id;

        database.query(`INSERT INTO users(user, profile)
        VALUES ('wile', 'wilian')
        WHERE id = ${req.userId}`, (err, result) => {
            if(err){
                console.log("Deu erro no AddProfile.mjs query!", err);
            }

            console.log("foi", result);

            res.status(200).send(JSON.stringify({
                user: "",
                profile: ""
            }));
        });
        
    });

});

export default Router;