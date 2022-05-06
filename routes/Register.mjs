import express from "express";
import database from "../config/database.mjs";
const Router = express.Router();

Router.post("/", (req, res) => {
    const user = req.body.user || "";
    const profile = req.body.profile || "";
    const email = req.body.email || "";
    const password = req.body.password || "";
    const repeatPassword = req.body.repeatPassword || "";
    const avatar = req.body.avatar || "https://iili.io/VvKa8g.png";
    
    if(user.length < 5 || user.trim() == ""){
        return res.status(400).send({
            message: "Por favor, preencha o usuário corretamente!",
            status: res.statusCode
        });
    };

    if(profile.length < 5 || profile.trim() == ""){
        return res.status(400).send({
            message: "Por favor, preencha seu nome de perfil, corretamente!",
            status: res.statusCode
        });
    }

    if(email.length < 5 || email.trim() == ""){
        return res.status(400).send({
            message: "Por favor, preencha o E-mail corretamente!",
            status: res.statusCode
        });
    }

    if(!email.includes("@")){
        return res.status(400).send({
            message: "Por favor, preencha o E-mail corretamente!",
            status: res.statusCode
        });
    }

    if(password.length < 5 || password.trim() == ""){
        return res.status(400).send({
            message: "Por favor, preencha a senha corretamente!",
            status: res.statusCode
        });
    };

    if(repeatPassword.length < 5 || repeatPassword.trim() == ""){
        return res.status(400).send({
            message: "Por favor, confirme sua senha!",
            status: res.statusCode
        });
    }

    if(password !== repeatPassword){
        return res.status(400).send({
            message: "As senhas são diferentes!",
            status: res.statusCode
        });
    }
    
    database.query(`SELECT * from users WHERE email = '${email}'`, (err, result) => {
        if(err){
            console.log("Não foi achado nenhum email!");
        }

        if(JSON.stringify(result.length) > 0){
            return res.status(400).send({
                message: "E-mail já está sendo usado!",
                status: res.statusCode
            });
        }
        else if(user.trim() && profile.trim() && email.trim() && password.trim() && repeatPassword.trim () && password === repeatPassword){

            database.query(`INSERT INTO users (user, profile, email, password, avatar)
            VALUES('${user}', '${profile}', '${email}', '${password}', '${avatar}')`);

            return res.status(200).send({
                message: "Cadastro realizado com Sucesso!",
                status: res.statusCode
            });
        }
        database.end();
    });
});

export default Router;