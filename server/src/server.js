const http = require("http");
const mongoose = require("mongoose");
const app = require("./app");
const { loadPlanetsData } = require("./models/planets.model");

const PORT = 8000;

const server = http.createServer(app);

const MONGO_URL =
  "mongodb+srv://adagiri:Ridwanullah477@krowdee-staging1.qt3cr.mongodb.net/nasa?retryWrites=true&w=majority";

mongoose.connection.once("open", () => {
  console.log("MongoDB connected");
});

mongoose.connection.on("error", (err) => {
  console.error("err",err);
});

async function startServer() {
  await mongoose.connect(MONGO_URL);

  await loadPlanetsData();

  server.listen(8000, () => {
    console.log(`listening upon port ${PORT}...`);
  });
}

startServer();
