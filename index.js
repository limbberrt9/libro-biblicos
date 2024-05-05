//express
const express = require('express');
const app = express();
const PORT = 2850; // puede cambiar

//array 
let librosBiblicos = [
    {id: 1 , nombre: 'Genesis', autor: 'Moises'},
    {id: 2 , nombre: 'Exodo', autor: 'Moises'},
    {id: 3 , nombre: 'Levitico', autor: 'Moises'},
];
//manejo de JSON
app.use(express.json());
//endpoint 1 obtener todos los libros
app.get('/libros', (req, res) => {
    res.json(librosBiblicos);
});
// endpoint 2 obtener libro por ID
app.get('/libros/:id',(req, res) => {
    const idCapturado = parseInt(req.params.id);
    console.log(idCapturado);
    const libroEncontrado = librosBiblicos.find((libro) => libro.id === idCapturado);
    if (libroEncontrado) {
        res.json(libroEncontrado);
    } else {
        res.status(404).json({mensaje : 'Libro no encontrado'});
    }
});
// endpoint 3 Agregar un libro
app.post('/agregar-libro', (req, res) => {
    const nuevoLibro = req.body;
    console.log(nuevoLibro);
    librosBiblicos.push(nuevoLibro);
    res.status(201).json('este libro fue guardado exitosamente');
})
//end point 4  actualizar libro
app.put ('actualizar-libro/:id', (req, res) => {
    const idCapturado = parseInt(req.params.id);
    const indexDelLibroLocalizado = librosBiblicos.findIndex((libro) => libro.id === idCapturado);
    if (indexDelLibroLocalizado !==-1){
        librosBiblicos[indexDelLibroLocalizado] = req.body;
        res.json(librosBiblicos[indexDelLibroLocalizado]);    
    }
    else {
        res.status(404).json({mensaje:'Libro Encontrado'});
    }
})




app.listen(PORT, () => {
    console.log("Servidor corriendo en el puerto http://localhost:" + PORT);
    
});