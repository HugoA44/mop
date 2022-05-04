import { useState } from "react";
import Geolocation from "react-native-geolocation-service";
import { generateTravel } from "../services/Api";

export const useCreateTravel = async (activities, time, geoLoc) => {
  console.log(activities);
  console.log(time);
  console.log(geoLoc);
  try {
    await generateTravel(
      JSON.stringify(activities),
      geoLoc.longitude,
      geoLoc.latitude,
      0.3,
      time
    );
  } catch (error) {
    console.error(error);
  }
};
