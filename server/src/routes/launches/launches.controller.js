const {
  getAllLaunches,
  addNewLaunch,
  existsLaunchWithId,
} = require("../../models/launches.model");

function httpGetAllLaunches(req, res) {
  res.status(200).json(getAllLaunches());
}

function httpAddNewLaunch(req, res) {
  const launch = req.body;

  if (
    !launch.launchDate ||
    !launch.mission ||
    !launch.target ||
    !launch.rocket
  ) {
    return res.status(400).json({ error: "Missing required launch property" });
  }

  launch.launchDate = new Date(launch.launchDate);

  if (isNaN(launch.launchDate)) {
    return res.status(400).json({ error: "Invalid launch date" });
  }

  res.status(200).json(addNewLaunch(launch));
}

function httpAbortLaunch(req, res) {
  const launchId = req.params.id;

  if (!launchId) {
  return res.status(400).json({ message: "Launch id is missing" });
  }

  if (!existsLaunchWithId(launchId)) {
  return res.status(404).json({ message: "Launch not found" });
  }

  res.status(200).json({message: "aborted"});
}

module.exports = {
  httpGetAllLaunches,
  httpAddNewLaunch,
  httpAbortLaunch,
};
