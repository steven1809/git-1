// server.js
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const db = require("./database"); // Asegúrate de que database.js esté configurado

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));

// -----------------------
// RUTAS
// -----------------------

// Página principal
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public/index.html"));
});

// -----------------------
// REGISTRO
// -----------------------
app.post("/registro", (req, res) => {
  const { nombre, email, password } = req.body;

  if (!nombre || !email || !password) {
    return res.send("Por favor completa todos los campos.");
  }

  const sql = "INSERT INTO usuarios (nombre, email, password) VALUES (?, ?, ?)";
  db.query(sql, [nombre, email, password], (err, result) => {
    if (err) {
      console.log(err);
      return res.send("Error al registrar usuario (¿email ya existe?).");
    }
    res.send("Usuario registrado correctamente. <a href='login.html'>Iniciar sesión</a>");
  });
});

// -----------------------
// LOGIN
// -----------------------
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.send("Por favor ingresa email y contraseña.");
  }

  const sql = "SELECT * FROM usuarios WHERE email=? AND password=?";
  db.query(sql, [email, password], (err, result) => {
    if (err) {
      console.log(err);
      return res.send("Error en el servidor.");
    }

    if (result.length > 0) {
      // Usuario correcto → redirige al dashboard
      res.redirect("dashboard.html");
    } else {
      res.send("Usuario o contraseña incorrectos. <a href='login.html'>Intentar de nuevo</a>");
    }
  });
});

// -----------------------
// INICIAR SERVIDOR
// -----------------------
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
