import express from "express";
import database from "../config/database.mjs";
import jwt from "jsonwebtoken";

const Router = express.Router();

// Router.get("/", (req, res) => {
//     database.query(`SELECT * FROM users`, (err, result) => {
//         if(err){console.log("Erro na query do get em Profile.mjs")};

//         res.status(200).send(JSON.stringify({
//             users: result
//         }));
//     });
// });

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

            const date =  result.find(memberDate => memberDate.member_date);
            const year = JSON.stringify(date.member_date).slice(1, 5);
            const month = JSON.stringify(date.member_date).slice(6, 8);
            const day = JSON.stringify(date.member_date).slice(9, 11);

            const user = result.find(user => user.user) || "";
            const profile = result.find(profile => profile.profile) || "";
            const avatar = result.find(avatar => avatar.avatar) || "";
            const about = result.find(about => about.about) || "";
            const followers = result.find(followers => followers.followers >= 0) || "";
            const following = result.find(following => following.following >= 0) || "";
            const betas = result.find(betas => betas.betas >= 0) || "";

            res.status(200).send(JSON.stringify({
                message: "Ok",
                auth: true,
                user: user.user,
                profile: profile.profile,
                status: res.statusCode,
                avatar: avatar.avatar,
                about: about.about,
                followers: followers.followers,
                following: following.following,
                betas: betas.betas,
                year: year,
                month: month,
                day: day
            }))
        });
        
    });

});

export default Router;