import React from "react";
import { Box, Slider, Text } from "native-base";
import IconButton from "react-native-vector-icons/Ionicons";

export const TimeSelector = ({ time, setTime }) => {
  return (
    <Box w="100%" flexDirection="row" alignItems="flex-end" paddingX={5}>
      <IconButton name="timer-outline" size={35} width="10%" />
      <Box w="90%" alignItems="flex-end">
        <Box w="90%" flexDirection="row" justifyContent={"space-between"}>
          <Text alignSelf="flex-start">Temps de libre :</Text>
          <Text alignSelf="flex-end" color="primary.500" fontWeight={"bold"}>
            {time < 60
              ? time + " M"
              : Math.floor(time / 60) +
                " H " +
                Math.floor((time / 60 - Math.floor(time / 60)) * 60)}
          </Text>
        </Box>

        <Slider
          w="90%"
          maxW="300"
          defaultValue={2}
          minValue={10}
          maxValue={1440}
          value={time}
          onChange={(value) => setTime(value)}
          step={5}
        >
          <Slider.Track>
            <Slider.FilledTrack />
          </Slider.Track>
          <Slider.Thumb />
        </Slider>
      </Box>
    </Box>
  );
};
