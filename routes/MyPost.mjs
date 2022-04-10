import express from "express";
const Router = express.Router();

Router.post("/", (req, res) => {
    console.log("MyPost respondendo");
});

export default Router;