import 'dotenv/config';
import express from "express";
import cors from "cors";
const app = express();
const port = process.env.PORT || 3080;
const path = require('path');
const publicPath = path.join(__dirname, '..', 'public');

//middlewares
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use(cors());

app.use(express.static(publicPath));


//Routes import
import Login from "./routes/Login.mjs";
import Register from "./routes/Register.mjs";
import Me from "./routes/Me.mjs";
import MyPost from "./routes/MyPost.mjs";


app.get('*', (req, res) => {
    res.sendFile(path.join(publicPath, 'index.html'));
 });

//Routes config
app.use("/login", Login);
app.use("/register", Register);
app.use("/me", Me);
app.use("/mypost", MyPost);

app.listen(port, console.log("Servidor rodando na porta " + port));