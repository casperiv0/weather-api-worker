import type { Weather } from "./types/Weather";

addEventListener("fetch", (event) => {
  event.respondWith(handleRequest(event.request));
});

async function handleRequest(request: Request): Promise<Response> {
  const url = new URL(request.url);

  const appId = typeof OPEN_WEATHER_MAP_API_KEY !== "undefined" ? OPEN_WEATHER_MAP_API_KEY : "";
  const unit = url.searchParams.get("unit") ?? "metric";
  const query = url.searchParams.get("query");

  if (!query) {
    const error = { status: "error", error: "`query` is a required field." };

    return new Response(JSON.stringify(error), {
      headers: { "Content-Type": "application/json" },
      status: 400,
    });
  }

  const weatherApiParams = new URLSearchParams();
  weatherApiParams.append("q", query);
  weatherApiParams.append("appid", appId);
  weatherApiParams.append("units", unit);

  const weatherApiUrl = `https://api.openweathermap.org/data/2.5/weather?${weatherApiParams.toString()}`;

  const res = (await fetch(weatherApiUrl)
    .then((v) => v.json())
    .catch(() => null)) as Weather | null;

  const data = {
    data: res,
    powered_by: "https://openweathermap.com/api",
  };

  return new Response(JSON.stringify(data), {
    headers: { "content-type": "application/json" },
  });
}
