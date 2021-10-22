const http = require("http");

const app = require("./app");
const { loadPlanetsData } = require("./models/planets.model");

const PORT = 8000;

const server = http.createServer(app);

async function startServer() {
  await loadPlanetsData();
  server.listen(8000, () => {
    console.log(`listening upon port ${PORT}...`);
  });
}

startServer();