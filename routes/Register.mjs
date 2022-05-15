import express from "express";
import database from "../config/database.mjs";
const Router = express.Router();

import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

import nodemailer from "nodemailer";

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
    if(!email.includes(".com")){
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

            bcrypt.genSalt(10, function(err, salt) {
                bcrypt.hash(password, salt, function(err, hash) {
                    const newPassword = hash;

                    database.query(`INSERT INTO users (user, profile, email, password, avatar)
                        VALUES('${user}', '${profile}', '${email}', '${newPassword}', '${avatar}')`);
                        database.end();

                        const transporter = nodemailer.createTransport({
                            host: 'smtp.gmail.com',
                            port: 587,
                            ignoreTLS: false,
                            secure: false,
                            auth: {
                                user: "betasocialsuporte@gmail.com",
                                pass: "Pinga9090!"
                            }
                        });


                        const token = jwt.sign({
                            data: "Token data",
                            email: email
                            }, process.env.SECRET_KEY, { expiresIn: '10m' }  
                        );

                        const mailOptions = {
                            from: 'Beta Social <betasocialsuporte@gmail.com>',
                            to: `${email}`,
                            subject: 'Welcome to Beta Social! Confirm Your Email',
                            text: `Hi! There, You have recently visited 
                            our website and entered your email.
                            Please follow the given link to verify your email
                            https://tariqa.herokuapp.com/verify/${token} 
                            Thanks`
                        };

                        transporter.sendMail(mailOptions, function(error, info){
                            if (error) {
                            console.log(error);
                            } else {
                            console.log('Email sent: ' + info.response);
                            }
                        });

                        return res.status(200).send({
                            message: "Cadastro realizado com Sucesso!",
                            status: res.statusCode
                        });
                });
            });

            // database.query(`INSERT INTO users (user, profile, email, password, avatar)
            // VALUES('${user}', '${profile}', '${email}', '${password}', '${avatar}')`);

            // const transporter = nodemailer.createTransport({
            //     host: 'smtp.gmail.com',
            //     port: 587,
            //     ignoreTLS: false,
            //     secure: false,
            //     auth: {
            //         user: "betasocialsuporte@gmail.com",
            //         pass: "Pinga9090!"
            //     }
            // });


            // const token = jwt.sign({
            //     data: "Token data",
            //     email: email
            //     }, process.env.SECRET_KEY, { expiresIn: '10m' }  
            // );

            // const mailOptions = {
            //     from: 'Beta Social <betasocialsuporte@gmail.com>',
            //     to: `${email}`,
            //     subject: 'Welcome to Beta Social! Confirm Your Email',
            //     text: `Hi! There, You have recently visited 
            //     our website and entered your email.
            //     Please follow the given link to verify your email
            //     http://localhost:3080/verify/${token} 
            //     Thanks`
            // };

            // transporter.sendMail(mailOptions, function(error, info){
            //     if (error) {
            //       console.log(error);
            //     } else {
            //       console.log('Email sent: ' + info.response);
            //     }
            // });
        
        }
        // database.end();
    });
});

export default Router;