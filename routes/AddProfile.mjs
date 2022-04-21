import express from "express";
import database from "../config/database.mjs";
import jwt from "jsonwebtoken";

const Router = express.Router();

Router.post("/", (req, res) => {
    let newUser = req.body.newUser;
    const newProfile = req.body.newProfile;
    const token = req.body.token;


    if(newUser === 'undefnied'){
        newUser = req.body.dbUser;
    }

    jwt.verify(token, process.env.SECRET_KEY, function(err, decoded) {
        if (err) return res.json({ 
            auth: false,
            message: 'Falha ao autenticar o Token. esse é do Profile.mjs'
        });

        // se tudo estiver ok, salva no request para uso posterior.
        req.userId = decoded.id;

        database.query(`UPDATE users SET user = '${newUser}', profile = '${newProfile}'
        WHERE id = ${req.userId}`, (err, result) => {
            if(err){
                console.log("Deu erro no AddProfile.mjs query!", err);
            }

            console.log("foi", result);

            res.status(200).send(JSON.stringify({
                user: newUser,
                profile: newProfile
            }));
        });
        
    });

});

export default Router;