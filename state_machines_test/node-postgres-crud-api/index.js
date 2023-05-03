const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const {maquinaEstadosPregunta} = require('./maquinaEstado')
const port = 3000;
const db = require("./queries");

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.get("/", (request, response) => {
  response.json({ info: "Node.js, Express, and Postgres API" });
});
app.get("/users", db.getUsers);
app.get("/users/:id", db.getUserById);
app.post("/users", db.createUser);
app.put("/users/:id", db.updateUser);
app.delete("/users/:id", db.deleteUser);

const validarActualizarEstado = async(idPregunta,operacion) =>{
  // se tiene el objeto
  const nuevoEstado = maquinaEstadosPregunta(
    pregunta.estado,
  ).executeTransition(operacion);

  // await this.etapaService.validarVigenciaDeLaEtapa(
  //   pregunta.idEtapaAreaGrado,
  //   this.hitosCargaVerificacion,
  // );
  return nuevoEstado;
}
app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});
