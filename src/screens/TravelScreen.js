import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Fab,
  HStack,
  Image,
  Pressable,
  ScrollView,
  SimpleGrid,
  Slider,
  Text,
  View,
} from "native-base";
import LinesScreen from "./LinesScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon from "react-native-vector-icons/Ionicons";
import { getLocation } from "../contexts/GeoContext";
import Geolocation from "react-native-geolocation-service";
import { TimeSelector } from "../components/timeSelector/TimeSelector";
import { ActivitySelector } from "../components/activitySelector/ActivitySelector";
import { useCreateTravel } from "../hooks/useCreateTravel";

export const TravelScreen = () => {
  const [currentTravelId, setCurrentTravelId] = useState(null);
  const [time, setTime] = useState(2);
  const [activities, setActivities] = useState([]);
  const [geoLoc, setGeoLoc] = useState({ longitude: 0, latitude: 0 });

  const getCurrentTravelId = async () => {
    const currentTravelId = await AsyncStorage.getItem("CURRENT_TRAVEL_ID");
    setCurrentTravelId(currentTravelId);
  };

  console.log(currentTravelId);
  useEffect(() => {
    getCurrentTravelId();
    Geolocation.getCurrentPosition(
      (position) => {
        setGeoLoc({
          longitude: position.coords.longitude,
          latitude: position.coords.latitude,
        });
      },
      (error) => {
        // See error code charts below.
        console.log(error.code, error.message);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  }, []);

  return (
    <ScrollView>
      {currentTravelId ? (
        <LinesScreen />
      ) : (
        <Box alignItems="center">
          <Fab
            right={"25%"}
            bottom={75}
            icon={<Icon color="white" name="happy" size={20} />}
            label="Créer mon parcours"
            onPress={() => useCreateTravel(activities, time, geoLoc)}
          />

          <Text
            style={{
              fontWeight: "bold",
              fontSize: 20,
              marginTop: 20,
              marginHorizontal: 20,
              marginBottom: 30,
            }}
          >
            Renseignes ton temps et tes activités souhaitées :
          </Text>
          <Image
            style={{ width: "100%", height: 200 }}
            alt="city"
            source={{
              uri: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1420&q=80",
            }}
          />
          <Box
            alignItems="center"
            w="90%"
            shadow={1}
            style={{
              paddingVertical: 20,
              backgroundColor: "white",
              height: "auto",
              marginTop: -55,
              borderRadius: 3,
            }}
          >
            <TimeSelector time={time} setTime={setTime} />
          </Box>

          <HStack
            justifyContent={"space-around"}
            w="100%"
            flexWrap={"wrap"}
            padding="5%"
          >
            <ActivitySelector
              activities={activities}
              setActivities={setActivities}
              activityNode="node['amenity'='restaurant']"
              name="Restauration"
              image={
                "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1420&q=80"
              }
            />
            <ActivitySelector
              activities={activities}
              setActivities={setActivities}
              activityNode="node['amenity'='bar']"
              name="Bar"
              image={
                "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1420&q=80"
              }
            />
          </HStack>
        </Box>
      )}
    </ScrollView>
  );
};
