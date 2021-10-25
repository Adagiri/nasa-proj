const fs = require("fs");
const path = require("path");
const parse = require("csv-parse");

const planets = require("./planets.mongo");

const habitablePlanets = [];

function isHabitable(planet) {
  return (
    planet["koi_disposition"] === "CONFIRMED" &&
    planet["koi_insol"] > 0.36 &&
    planet["koi_insol"] < 1.11 &&
    planet["koi_prad"] < 1.6
  );
}

// planets data should load first before server starts
function loadPlanetsData() {
  return new Promise((resolve, reject) => {
    fs.createReadStream(path.join(__dirname, "..", "..", "data", "kepler.csv"))
      .pipe(
        parse({
          columns: true,
          comment: "#",
        })
      )
      .on("data", (data) => {
        if (isHabitable(data)) {
          savePlanet(data);
        }
      })
      .on("error", (err) => {
        reject();
      })
      .on("end", async () => {
        console.log(
          `found ${(await getAllPlanets()).length} habitable planets`
        );
        resolve();
      });
  });
}

async function getAllPlanets() {
  return await planets.find({}, { keplerName: 1, _id: 0 });
}

async function savePlanet(planet) {
  try {
    await planets.updateOne(
      { keplerName: planet.kepler_name },
      { keplerName: planet.kepler_name },
      { upsert: true }
    );
  } catch (error) {
    console.log("Failed to save planet", error);
  }
}
module.exports = {
  loadPlanetsData,
  getAllPlanets,
};
