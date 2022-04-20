import 'dotenv/config';
import express from "express";
import cors from "cors";
import path from 'path';
import {fileURLToPath} from 'url';

//Routes import
import Login from "./routes/Login.mjs";
import Register from "./routes/Register.mjs";
import Me from "./routes/Me.mjs";
import MyPost from "./routes/MyPost.mjs";
import Profile from "./routes/Profile.mjs";
import AddProfile from "./routes/AddProfile.mjs";

const app = express();
const port = process.env.PORT || 8080;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const publicPath = path.join(__dirname, 'public');

//middlewares
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use(cors());

app.use(express.static(publicPath));

app.get("/", (req, res) => {
    res.send("Olha a api");
})

// app.get('*', (req, res) => {
//     // res.send("OLHA O SERVIDOR!")
//     res.sendFile(path.join(publicPath, 'index.html'));
//  }); 

//Routes config
app.use("/login", Login);
app.use("/register", Register);
app.use("/me", Me);
app.use("/mypost", MyPost);
app.use("/profile", Profile);
app.use("/addprofile", AddProfile);

app.listen(port, console.log("Servidor rodando na porta " + port));