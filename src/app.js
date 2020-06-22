const express = require("express");
const cors = require("cors");

const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  // TODO

  return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  // TODO
  const { title, url, techs } = request.body;
  const repository = {
    id: uuid(),
    title,
    url,
    techs,
    likes: 0,
  }

  repositories.push(repository);

  return response.json(repository);

});

app.put("/repositories/:id", (request, response) => {
  // TODO
  const { id } = request.params;
  const { title, url, techs } = request.body;
  //const repository = request.params;

  const repositoryIndex = repositories.findIndex(repository => repository.id === id);

  if (repositoryIndex < 0) {
    return response.status(400).json({ error: "Repository not Found" });
  }

  const { likes } = repositories[repositoryIndex];

  const newRepository = {
    id,
    title,
    url,
    techs,
    likes,
  }
  repositories[repositoryIndex] = newRepository;
  // repositories.splice(newRepository, 1);
  return response.status(200).json(newRepository);

  // return response.status(204).send();

});

app.delete("/repositories/:id", (request, response) => {
  // TODO
  // recebe o Id do projeto que deseja deletar
  const { id } = request.params;
  //Cria uma variavel que percorre o array em busca de um ID para deletar.

  const repositoryDelete = repositories.findIndex(repositories => repositories.id === id);

  if (repositoryDelete < 0) {
    return response.status(400).json({ Error: "Repository ID not found." });
  }

  // Splice = metodo para tirar informação de dentro do array
  repositories.splice(repositoryDelete, 1);
  return response.status(204).send()


});

app.post("/repositories/:id/like", (request, response) => {
  // TODO
  // recebe o Id do projeto que deseja alterar
  const { id } = request.params;
  // Buscar o ID
  const repository = repositories.find(repository => repository.id === id);

  if (!repository) {
    return response.status(400).send({ error: "Error not Like" })
  }
  repository.likes += 1;
  return response.json(repository);
});

module.exports = app;
