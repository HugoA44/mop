import * as React from "react";
import {
  Dimensions,
  StatusBar,
  Pressable,
  useColorScheme,
  Platform,
} from "react-native";
import { TabView, SceneMap } from "react-native-tab-view";
import { Box, Text, useColorModeValue } from "native-base";
import { colors } from "../../theme/Theme";

const initialLayout = {
  width: Dimensions.get("window").width,
};

export function TabsComponent({ views, style }) {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState(views);

  const renderScene = SceneMap({
    first: views[0].component,
    // second: views[1].component
  });

  const isDarkMode = useColorScheme() === "dark";

  const renderTabBar = (props) => {
    return (
      <Box flexDirection="row" width="100%">
        {props.navigationState.routes.map((route, i) => {
          const color = index === i ? colors.primary[500] : "black";
          const borderColor =
            index === i ? colors.primary[500] : colors.primary[50];
          return (
            <Pressable
              key={i}
              onPress={() => {
                setIndex(i);
              }}
              alignItems="center"
              p="3"
              flex={1}
            >
              <Box
                borderBottomWidth="2"
                borderColor={borderColor}
                alignItems="center"
                p="3"
                style={{ width: "100%" }}
              >
                <Text
                  style={{
                    color,
                  }}
                >
                  {route.title}
                </Text>
              </Box>
            </Pressable>
          );
        })}
      </Box>
    );
  };

  return (
    <TabView
      navigationState={{
        index,
        routes,
      }}
      renderScene={renderScene}
      renderTabBar={renderTabBar}
      onIndexChange={setIndex}
      initialLayout={initialLayout}
      style={{
        marginTop:
          style?.marginTop || Platform.OS === "ios"
            ? StatusBar.currentHeight
            : 0,
        height: "300%",
        backgroundColor: "#000",
      }}
    />
  );
}
