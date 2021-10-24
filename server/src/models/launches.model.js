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

launches.set(launch.flightNumber, launch);

function existsLaunchWithId(launchId) {
  return launches.has(launchId);
}

function getAllLaunches() {
  return Array.from(launches.values());
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

module.exports = {
  launches,
  existsLaunchWithId,
  getAllLaunches,
  addNewLaunch,
  abortLaunch,
};
