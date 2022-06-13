import React, { useEffect } from "react";
import { Button, Container, Fab, Image, Text } from "native-base";
import Icon from "react-native-vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { Lines } from "../components/lines/Lines";

import { TabsComponent } from "../components/tabs/Tabs";
import { Maps } from "../components/maps/Maps";

function LinesScreen({ getCurrentTravelId }) {
  const removeTravel = async () => {
    try {
      await AsyncStorage.removeItem("CURRENT_TRAVEL_ID");
      await getCurrentTravelId();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container style={{ maxWidth: "100%" }} h="100%" w="100%">
      {/* <Text
        fontSize="lg"
        style={{ color: "white", position: "absolute", top: 150 }}
      >
        Paris
      </Text> */}
      <Image
        style={{ width: "100%", height: 150 }}
        source={{
          uri: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1420&q=80",
        }}
      />

      {/* <TabsComponent
        views={[
          {
            key: "first",
            title: "Parcours",
            component: Lines,
          },
          // {
          //   key: "second",
          //   title: "Carte",
          //   component: Maps,
          // },
        ]}
      /> */}

      <Lines />

      <Fab
        onPress={removeTravel}
        position="absolute"
        bottom={90}
        right={5}
        size="md"
        backgroundColor={"red.500"}
        icon={<Icon name="exit" size={25} color="white" />}
      />
    </Container>
  );
}

export default LinesScreen;
