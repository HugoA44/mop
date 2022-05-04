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
import { generateTravel, getAllTrips } from "../../services/Api";
import Trip from "../trips/Trip";
import { RefreshControl } from "react-native";
import IconButton from "react-native-vector-icons/Ionicons";

export function Lines() {
  const [trips, setTrips] = useState([]);
  const [loading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [travels, setTravels] = useState();

  // Lors du refresh, on affiche l'animation de refresh, et on rappelle l'api
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    // getTrips().then(() => setRefreshing(false));
  }, []);

  const getTrips = async () => {
    const trips = await generateTravel();
    await setTravels(trips);
  };

  if (travels) {
    console.log("travels", JSON.parse(travels.journey));
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

  if (!travels) {
    return (
      <>
        <Button onPress={getTrips}>Générer trajet</Button>
        <Text>Pas de trajet disponible 🙁</Text>
      </>
    );
  }

  return (
    // Scroll view, qui permet de rafraichir en glissant
    <>
      <Button onPress={getTrips}>Générer trajet</Button>
      <ScrollView
        style={{
          maxWidth: "100%",
          paddingHorizontal: 20,
          display: "flex",
          flexDirection: "column",
        }}
        h="100%"
        w="100%"
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
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
        {travels?.journey &&
          JSON.parse(travels?.journey)?.map((trip, index) => {
            return (
              <Box
                width={"100%"}
                key={index}
                style={{
                  marginBottom: 20,
                  borderRadius: 5,
                  overflow: "hidden",
                }}
              >
                <Image
                  width={"100%"}
                  height={125}
                  source={{
                    uri: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
                  }}
                />
                <Text fontSize={24} fontWeight="bold">
                  <IconButton name="navigate-circle-outline" size={25} />
                  {trip[1].tags?.name}
                </Text>
                <Text fontSize={15} fontWeight="bold">
                  {trip[1].tags?.amenity}
                </Text>
              </Box>
            );
          })}
      </ScrollView>
    </>
  );
}
