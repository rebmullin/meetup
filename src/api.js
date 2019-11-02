import { mockEvents } from "./mock-events";
import axios from "axios";

export const getSuggestions = async query => {
  if (window.location.href.startsWith("http://localhost")) {
    return [
      {
        city: "Munich",
        country: "de",
        localized_country_name: "Germany",
        name_string: "Munich, Germany",
        zip: "meetup3",
        lat: 48.14,
        lon: 11.58
      },
      {
        city: "Munich",
        country: "us",
        localized_country_name: "USA",
        state: "ND",
        name_string: "Munich, North Dakota, USA",
        zip: "58352",
        lat: 48.66,
        lon: -98.85
      }
    ];
  }

  let token;

  try {
    token = await getAccessToken();
  } catch (err) {
    console.error(err);
  }

  if (token) {
    const url =
      "https://api.meetup.com/find/locations?&sign=true&photo-host=public&query=" +
      query +
      "&access_token=" +
      token;

    const result = await axios.get(url);
    return result.data;
  }

  return [];
};

export const getEvents = async (page = 5, lat, lon) => {
  if (window.location.href.startsWith("http://localhost")) {
    return mockEvents.events.slice(0, page);
  }
  let token;

  try {
    token = await getAccessToken();
  } catch (err) {
    console.error(err);
  }
  if (token) {
    let url =
      "https://api.meetup.com/find/upcoming_events?&sign=true&photo-host=public" +
      "&access_token=" +
      token +
      "&page=" +
      page;

    // lat, lon is optional; if you have a lat and lon, you can add them
    if (lat && lon) {
      url += "&lat=" + lat + "&lon=" + lon;
    }

    const result = await axios.get(url);
    return result.data.events;
  }
  return [];
};

export const getAccessToken = async () => {
  const accessToken = localStorage.getItem("access_token");

  if (!accessToken) {
    const searchParams = new URLSearchParams(window.location.search);
    const code = searchParams.get("code");

    if (!code) {
      window.location.href =
        "https://secure.meetup.com/oauth2/authorize?client_id=nc5kjkho528g8m428ke0j2pqve&response_type=code&redirect_uri=https://rebmullin.github.io/meetup/";
      return null;
    }

    return getOrRenewAccessToken("get", code);
  }

  const lastSavedTime = localStorage.getItem("last_saved_time");
  if (accessToken && Date.now() - lastSavedTime < 3600000) {
    return accessToken;
  }

  // if the access_token is expired, we try to renew it by using refresh_token
  const refreshToken = localStorage.getItem("refresh_token");
  return getOrRenewAccessToken("renew", refreshToken);
};

async function getOrRenewAccessToken(type, key) {
  let url;
  if (type === "get") {
    // Lambda endpoint to get token by code
    url =
      "https://pc87h2bt63.execute-api.us-east-1.amazonaws.com/dev/api/token/" +
      key;
  } else if (type === "renew") {
    // Lambda endpoint to get token by refresh_token
    url =
      "https://pc87h2bt63.execute-api.us-east-1.amazonaws.com/dev/api/refresh/token/" +
      key;
  }

  // Use Axios to make a GET request to the endpoint
  const tokenInfo = await axios.get(url);

  // Save tokens to localStorage together with a timestamp

  localStorage.setItem("access_token", tokenInfo.data.access_token);
  localStorage.setItem("refresh_token", tokenInfo.data.refresh_token);
  localStorage.setItem("last_saved_time", Date.now());

  return tokenInfo.data.access_token;
}
