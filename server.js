const express = require("express");
const bodyParser = require("body-parser");
const db = require("./database");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.use(express.static("public"));


// REGISTRO
app.post("/registro", (req,res)=>{

    const {nombre,email,password} = req.body;

    const sql = "INSERT INTO usuarios(nombre,email,password) VALUES (?,?,?)";

    db.query(sql,[nombre,email,password],(err,result)=>{

        if(err){
            res.send("Error al registrar");
        }else{
            res.send("Usuario registrado");
        }

    });

});


// LOGIN

app.post("/login",(req,res)=>{

    const {email,password} = req.body;

    const sql = "SELECT * FROM usuarios WHERE email=? AND password=?";

    db.query(sql,[email,password],(err,result)=>{

        if(result.length > 0){
            res.send("Login correcto");
        }else{
            res.send("Usuario o contraseña incorrectos");
        }

    });

});


app.listen(3000,()=>{
    console.log("Servidor en puerto 3000");
});