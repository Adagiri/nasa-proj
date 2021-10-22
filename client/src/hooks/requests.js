const API_URL = "http://localhost:8000";

async function httpGetPlanets() {
  const response = await fetch(`${API_URL}/planets`);
  const planets = await response.json();
  return planets;
}

async function httpGetLaunches() {
  const response = await fetch(`${API_URL}/launches`);
  const launches = await response.json();
  return launches.sort((a, b) => a.flightNumber - b.flightNumber);
}

async function httpSubmitLaunch(launch) {
  try {
    return await fetch(`${API_URL}/launches`, {
      body: JSON.stringify(launch),
      headers: { "Content-Type": "application/json" },
      method: "post",
    });
  } catch (error) {
    return { ok: false };
  }
}

async function httpAbortLaunch(id) {
  try {
    return await fetch(`${API_URL}/launches/${id}`, {
      method: "delete",
    });
  } catch (error) {
    console.log(error);
    return {
      ok: false
    }
  }
}

export { httpGetPlanets, httpGetLaunches, httpSubmitLaunch, httpAbortLaunch };
