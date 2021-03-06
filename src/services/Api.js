import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const api = axios.create({
  baseURL: "https://mysterious-island-90985.herokuapp.com",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  timeout: 10000,
});

/**
 * Appel d'API pour la connexion
 * @param { Object } credentials
 * @returns { Object }
 */
const loginWithCredentials = async (credentials) => {
  try {
    const response = await api.post("/api/auth/signin", credentials);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

/**
 * registerWithRegistrationCredentials
 * @param { props } registrationCredentials Credentials for registration email or username + password requireds
 * @returns { Function } Registration with credentials
 */
const registerWithRegistrationCredentials = async (registrationCredentials) => {
  try {
    const response = await api.post(
      "/api/auth/signup",
      registrationCredentials
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

const generateTravel = async (placetypes, longitude, latitude, ray, time) => {
  const getUserToken = await AsyncStorage.getItem("AUTH");
  const userToken = getUserToken ? JSON.parse(getUserToken).token : null;
  console.log("placetypes", placetypes);
  console.log("longitude", longitude);
  console.log("latitude", latitude);
  console.log("ray", ray);
  var data = JSON.stringify({
    // placetype:
    //   "[\"node['amenity'='restaurant']\",\"node['leisure'='fitness_centre']\"]",
    // latitude: 47.218371,
    // longitude: -1.553621,
    ray: 0.03,
    placetype: placetypes,
    longitude,
    latitude,
    // ray,
  });

  try {
    const response = await api.post("/api/travel/", data, {
      headers: {
        "x-access-token": userToken,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    console.log("RESPONSE", response.data);
    try {
      await AsyncStorage.setItem(
        "CURRENT_TRAVEL_ID",
        response.data.id.toString()
      );
    } catch (error) {
      console.error(error);
    }
    return response?.data;
  } catch (error) {
    console.error(error.response.data);
    throw error.response.data;
  }
};

// /**
//  * R??cup??re tous les trajets
//  * @returns { Object }
//  */
// const getAllTrips = async () => {
//   try {
//     const response = await api.get("/trips?populate=*");
//     return response.data;
//   } catch (error) {
//     console.error(error);
//   }
// };

/**
 * R??cup??re un trajet
 * @param { Number } tripId
 * @returns { Object }
 */
const getOneTrip = async (tripId) => {
  const getUserToken = await AsyncStorage.getItem("AUTH");
  const userToken = getUserToken ? JSON.parse(getUserToken).token : null;

  try {
    const response = await api.get(`/api/travel/${tripId}`, {
      headers: {
        "x-access-token": userToken,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

// R??cup??ration des informations de l'utilisateur actuellement connect??
// const getUserInfos = async () => {
//   // On r??cup??re le token de l'utilisateur connect?? pour le passer dans le header
//   const getUserToken = await AsyncStorage.getItem("AUTH");
//   const userToken = getUserToken ? JSON.parse(getUserToken).token : null;
//   try {
//     const response = await api.get("/users/me", {
//       headers: {
//         "x-access-token": `${userToken}`,
//       },
//     });
//     return response.data;
//   } catch (error) {
//     console.error(error);
//   }
// };

export {
  loginWithCredentials,
  registerWithRegistrationCredentials,
  generateTravel,
  // getAllTrips,
  getOneTrip,
  // getUserInfos,
};
