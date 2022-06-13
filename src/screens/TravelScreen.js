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
        <LinesScreen getCurrentTravelId={getCurrentTravelId} />
      ) : (
        <Box alignItems="center">
          <Fab
            right={"25%"}
            bottom={75}
            icon={<Icon color="white" name="happy" size={20} />}
            label="Créer mon parcours"
            onPress={async () => {
              await useCreateTravel(activities, time, geoLoc);
              await getCurrentTravelId();
            }}
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
                "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
              }
            />
            <ActivitySelector
              activities={activities}
              setActivities={setActivities}
              activityNode="node['amenity'='bar']"
              name="Bar"
              image={
                "https://images.unsplash.com/photo-1532634922-8fe0b757fb13?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1772&q=80"
              }
            />
            <ActivitySelector
              activities={activities}
              setActivities={setActivities}
              activityNode="node['leisure'='escape_game']"
              name="Escape Game"
              image={
                "https://images.unsplash.com/photo-1560005490-8ce6d5357ffa?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1472&q=80"
              }
            />
            <ActivitySelector
              activities={activities}
              setActivities={setActivities}
              activityNode="node['leisure'='museum']"
              name="Musée"
              image={
                "https://images.unsplash.com/photo-1554907984-15263bfd63bd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
              }
            />
            <ActivitySelector
              activities={activities}
              setActivities={setActivities}
              activityNode="node['leisure'='fishing']"
              name="Pêche"
              image={
                "https://images.unsplash.com/photo-1609859682240-6860cf3d99d5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=736&q=80"
              }
            />
            <ActivitySelector
              activities={activities}
              setActivities={setActivities}
              activityNode="node['leisure'='fitness_centre']"
              name="Fitness"
              image={
                "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
              }
            />
            <ActivitySelector
              activities={activities}
              setActivities={setActivities}
              activityNode="node['leisure'='swimming_pool']"
              name="Piscine"
              image={
                "https://images.unsplash.com/photo-1576610616656-d3aa5d1f4534?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80"
              }
            />
            <ActivitySelector
              activities={activities}
              setActivities={setActivities}
              activityNode="node['leisure'='garden']"
              name="Jardins"
              image={
                "https://images.unsplash.com/photo-1588692442236-bbdcfe705f70?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80"
              }
            />
            <ActivitySelector
              activities={activities}
              setActivities={setActivities}
              activityNode="node['leisure'='horse_riding']"
              name="Promenade Echestre"
              image={
                "https://images.unsplash.com/photo-1598974357801-cbca100e65d3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8aG9yc2V8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60"
              }
            />
          </HStack>
        </Box>
      )}
    </ScrollView>
  );
};
