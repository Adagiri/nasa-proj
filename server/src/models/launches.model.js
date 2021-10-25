const launchesDatabase = require("./launches.mongo");
const planets = require("./planets.mongo");
const launches = new Map();

let lastFlightNumber = 100;

const launch = {
  flightNumber: 100,
  launchDate: new Date(2022, 2, 20),
  customers: ["Adagiri", "Ismail"],
  upcoming: true,
  success: true,
  rocket: "Explorer IS1",
  target: "Kepler-442 b",
  mission: "Adagiri space",
};

saveLaunch(launch);

function existsLaunchWithId(launchId) {
  return launches.has(launchId);
}

async function getAllLaunches() {
  return await launchesDatabase.find({}, { _id: 0, __v: 0 });
}

function addNewLaunch(launch) {
  lastFlightNumber++;

  launches.set(
    lastFlightNumber,
    Object.assign(launch, {
      flightNumber: lastFlightNumber,
      customers: ["Adagiri", "Ismail"],
      upcoming: true,
      success: true,
    })
  );

  return launch;
}

function abortLaunch(launchId) {
  const aborted = launches.get(launchId);
  aborted.success = false;
  aborted.upcoming = false;
  return aborted;
}

async function saveLaunch(launch) {
  const planet = await planets.findOne({ keplerName: launch.target });

  if (!planet) {
    throw new Error("No matching planet found");
  }

  await launchesDatabase.updateOne(
    { flightNumber: launch.flightNumber },
    launch,
    { upsert: true }
  );
}

module.exports = {
  launches,
  existsLaunchWithId,
  getAllLaunches,
  addNewLaunch,
  abortLaunch,
};
