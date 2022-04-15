import express from "express";
import jwt from "jsonwebtoken";
import db from "../config/database.mjs";

const Router = express.Router();

Router.post("/", (req, res) => {
  const token = req.body.token;
    
  jwt.verify(token, process.env.SECRET_KEY, function (err, decoded) {
    if (err) return res.json({ 
      auth: false,
      message: 'Falha ao autenticar o Token. esse é do me.mjs'
    });
          
    // se tudo estiver ok, salva no request para uso posterior.
    req.userId = decoded.id;
    
    res.status(200).send(JSON.stringify({
      message: "foi",
      auth: true,
      status: res.statusCode
    }));
  });
});

export default Router;