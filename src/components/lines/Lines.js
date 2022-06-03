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

export function Lines() {
  const [trips, setTrips] = useState([]);
  const [loading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [travel, setTravel] = useState();

  // const onRefresh = React.useCallback(() => {
  //   setRefreshing(true);
  // }, []);

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

  // Skeleton au chargement
  // if (loading) {
  //   return (
  //     <>
  //       <Skeleton h={130} mb={3} />
  //       <Skeleton h={130} mb={3} />
  //       <Skeleton h={130} mb={3} />
  //       <Skeleton h={130} mb={3} />
  //       <Skeleton h={130} mb={3} />
  //     </>
  //   );
  // }

  if (!travel) {
    return (
      <>
        <Text>Pas de trajet disponible 🙁</Text>
      </>
    );
  }

  return (
    // Scroll view, qui permet de rafraichir en glissant
    <>
      <ScrollView
        style={{
          maxWidth: "100%",
          paddingHorizontal: 20,
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#000",
        }}
        h="100%"
        w="100%"
        // refreshControl={
        // <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        // }
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
        {travel?.journey &&
          JSON.parse(travel?.journey)?.map((trip, index) => {
            return (
              // <Box
              //   width={"100%"}
              //   key={index}
              //   style={{
              //     marginBottom: 20,
              //     borderRadius: 5,
              //     overflow: "hidden",
              //   }}
              // >
              //   <Image
              //     width={"100%"}
              //     height={125}
              //     source={{
              //       uri: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
              //     }}
              //   />
              //   <Text fontSize={24} fontWeight="bold">
              //     <IconButton name="navigate-circle-outline" size={25} />
              //     {trip[1].tags?.name}
              //   </Text>
              //   <Text fontSize={15} fontWeight="bold">
              //     {trip[1].tags?.amenity}
              //   </Text>
              // </Box>
              <>
                <Text>Hello</Text>
                <Text>Hello</Text>
                <Text>Hello</Text>
                <Text>Hello</Text>
                <Text>Hello</Text>
                <Text>Hello</Text>
                <Text>Hello</Text>
              </>
            );
          })}
      </ScrollView>
    </>
  );
}
