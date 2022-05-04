import React from "react";
import { Image, Pressable, Text } from "native-base";

export const ActivitySelector = ({
  activities,
  setActivities,
  activityNode,
  image,
  name,
}) => {
  return (
    <Pressable
      w="50%"
      alignItems={"center"}
      onPress={(e) => {
        if (!activities.includes(activityNode)) {
          setActivities([...activities, activityNode]);
        } else {
          setActivities(
            activities.filter((activity) => activity !== activityNode)
          );
        }
      }}
      style={{
        opacity: activities.includes(activityNode) ? 1 : 0.5,
      }}
    >
      <Image
        style={{ width: "70%", height: 125 }}
        source={{
          uri: image,
        }}
      />
      <Text>{name}</Text>
    </Pressable>
  );
};
