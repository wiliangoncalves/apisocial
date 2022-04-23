import express from "express";
import database from "../config/database.mjs";
import jwt from "jsonwebtoken";

const Router = express.Router();

Router.post("/", (req, res) => {
    let newUser = req.body.newUser;
    let newProfile = req.body.newProfile;
    let newAvatar = req.body.newAvatar;
    const token = req.body.token;

    console.log(req.body.newAvatar, "DENTRO DO AddProfile.mjs")

    if(newUser === ''){
        newUser = req.body.dbUser;
    }

    if(newProfile === ''){
        newProfile = req.body.dbProfile;
    }

    console.log("Olha o avatar", typeof newAvatar);
    console.log("Olha o tamanho do AVATAR", newAvatar.length);
    console.log("ESTÁ VINDO DO REQ.BODY.AVATAR", req.body.avatar);

    if(newAvatar === '' || newAvatar.length <= 0){
        newAvatar = req.body.dbAvatar;
    }

    jwt.verify(token, process.env.SECRET_KEY, function(err, decoded) {
        if (err) return res.json({ 
            auth: false,
            message: 'Falha ao autenticar o Token. esse é do Profile.mjs'
        });

        // se tudo estiver ok, salva no request para uso posterior.
        req.userId = decoded.id;

        database.query(`UPDATE users SET user = '${newUser}', profile = '${newProfile}', avatar = '${newAvatar}'
        WHERE id = ${req.userId}`, (err, result) => {
            if(err){
                console.log("Deu erro no AddProfile.mjs query!", err);
            }

            console.log("foi", result);

            res.status(200).send(JSON.stringify({
                user: newUser,
                profile: newProfile,
                avatar: newAvatar
            }));
        });
        
    });

});

export default Router;