import express from "express";
import database from "../config/database.mjs";
import jwt from "jsonwebtoken";

const Router = express.Router();

Router.post("/", (req, res) => {
    let newUser = req.body.newUser;
    let newProfile = req.body.newProfile;
    let newAvatar = req.body.newAvatar;
    let newProfileAbout = req.body.newProfileAbout;
    const token = req.body.token;

    if(newUser === ''){
        newUser = req.body.dbUser;
    }

    if(newProfile === ''){
        newProfile = req.body.dbProfile;
    }

    
    if(newAvatar === '' || newAvatar.length <= 0 || newAvatar === 'undefined'){
        newAvatar = req.body.dbAvatar;
    }

    if(newProfileAbout === ''){
        newProfileAbout = req.body.dbProfileAbout;
    }

    jwt.verify(token, process.env.SECRET_KEY, function(err, decoded) {
        if (err) return res.json({ 
            auth: false,
            message: 'Falha ao autenticar o Token. esse é do Profile.mjs'
        });

        // se tudo estiver ok, salva no request para uso posterior.
        req.userId = decoded.id;

        database.query(`UPDATE users SET user = 
        '${newUser}', profile = '${newProfile}', avatar = '${newAvatar},', about = '${newProfileAbout}'
        WHERE id = ${req.userId}`, (err, result) => {
            if(err){
                console.log("Deu erro no AddProfile.mjs query!", err);
            }

            res.status(200).send(JSON.stringify({
                user: newUser,
                profile: newProfile,
                avatar: newAvatar,
                about: newProfileAbout
            }));
        });
        
    });

});

export default Router;