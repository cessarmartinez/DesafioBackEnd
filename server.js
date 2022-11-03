
const Contenedor = require("./classContenedor");
const fs = require("fs");
const express = require('express');
const app = express();
const port = process.env.PORT || 8080;

const contenedor = new Contenedor('productos.json');

app.get('/', (req, res) => {
    res.send("Productos disponibles: localhost:8080/productos || Producto al azar: /productoRandom")
  });

app.get('/productos', async(req, res) => {
    const productos = await contenedor.getAll();

    res.send(productos);
})

app.get('/productoRandom', async(req, res) => {
    const maxId = 4;
    const numRandom = Math.floor(Math.random() * maxId);
    const productos = await contenedor.getById(numRandom);
    res.send(productos);
  })

app.listen(port, () => {
  console.log(`Servidor ejecutandose en el puerto 8080`)
})