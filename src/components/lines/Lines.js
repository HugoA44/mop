import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Image,
  ScrollView,
  Skeleton,
  Text,
  View,
} from "native-base";
import { generateTravel, getAllTrips, getOneTrip } from "../../services/Api";
import Trip from "../trips/Trip";
import { RefreshControl } from "react-native";
import IconButton from "react-native-vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const Lines = () => {
  const [trips, setTrips] = useState([]);

  const [refreshing, setRefreshing] = useState(false);
  const [travel, setTravel] = useState();

  const getTrip = async () => {
    const currentTravelId = await AsyncStorage.getItem("CURRENT_TRAVEL_ID");
    const trip = await getOneTrip(currentTravelId);
    await setTravel(trip);
  };

  useEffect(() => {
    getTrip();
  }, []);

  console.log("travellll", travel);

  if (travel) {
    console.log("travel", JSON.parse(travel.journey));
  }

  if (!travel) {
    return (
      <>
        <Skeleton h={130} mb={3} />
        <Skeleton h={130} mb={3} />
        <Skeleton h={130} mb={3} />
        <Skeleton h={130} mb={3} />
        <Skeleton h={130} mb={3} />
      </>
    );
  }

  return (
    <ScrollView
      style={{
        maxWidth: "100%",
        paddingHorizontal: 20,
        display: "flex",
        flexDirection: "column",
      }}
      h="100%"
      w="100%"
    >
      <Box
        width={"100%"}
        style={{
          marginBottom: 20,
          borderRadius: 5,
          overflow: "hidden",
        }}
      >
        <Text fontSize={24} fontWeight="bold">
          Départ maintenant
        </Text>
        <Text fontSize={15} fontWeight="bold">
          <IconButton name="navigate-circle-outline" size={25} />
          Ma position
        </Text>
      </Box>
      {JSON.parse(travel?.journey) &&
        JSON.parse(travel?.journey)?.map((trip, index) => {
          console.log("trip", trip);
          return (
            <Box
              width={"100%"}
              key={index}
              style={{
                marginBottom: 20,
                borderRadius: 5,
                overflow: "hidden",
                height: 200,
              }}
            >
              <Image
                width={"100%"}
                height={125}
                source={{
                  uri: `https://source.unsplash.com/random/1600x900?${
                    trip[1].tags?.leisure?.replace("_", "-") ||
                    trip[1].tags?.amenity?.replace("_", "-")
                  }`,
                }}
              />
              <Text fontSize={24} fontWeight="bold">
                <IconButton name="navigate-circle-outline" size={25} />
                {trip[1].tags?.name}
              </Text>
              <Text fontSize={15} fontWeight="bold">
                {trip[1].tags?.leisure?.replace("_", " ") ||
                  trip[1].tags?.amenity?.replace("_", " ")}
              </Text>
              <Text fontSize={15} fontWeight="bold">
                {trip[0].walk_travel_time_minutes} minutes à pied
              </Text>
            </Box>
          );
        })}
    </ScrollView>
  );
};
