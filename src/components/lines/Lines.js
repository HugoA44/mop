import React, { useEffect, useState } from "react";
import { ScrollView, Skeleton, Text } from "native-base";
import { getAllTrips } from "../../services/Api";
import Trip from "../trips/Trip";
import { RefreshControl } from "react-native";

export function Lines() {
  const [trips, setTrips] = useState([]);
  const [loading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = React.useState(false);

  // Lors du refresh, on affiche l'animation de refresh, et on rappelle l'api
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    // getTrips().then(() => setRefreshing(false));
  }, []);

  // const getTrips = async () => {
  //   const trips = await getAllTrips()
  //   setIsLoading(false)
  //   setTrips(trips)
  // }

  // useEffect(() => {
  //   getTrips();
  // }, []);

  // Skeleton au chargement
  if (loading) {
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

  // Si pas de trajets dispo, on affiche pas de trajet
  if (!trips.data) {
    return <Text>Pas de trajet disponible 🙁</Text>;
  }

  return (
    // Scroll view, qui permet de rafraichir en glissant
    <ScrollView
      style={{ maxWidth: "100%" }}
      h="100%"
      w="100%"
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      {/* On map les trajets disponibles */}
      {trips?.data.map((trip) => {
        return <Trip key={trip.id} trip={trip.attributes} />;
      })}
    </ScrollView>
  );
}
