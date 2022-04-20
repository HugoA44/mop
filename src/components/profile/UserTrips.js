import React, { useState } from 'react'
import {
  Text,
  Container,
  VStack,
  Switch,
  Center,
  Box,
  Heading,
  ScrollView
} from 'native-base'

function UserTrips() {
  // state pour switcher trajets passés ou à venir
  const [toggleTrips, setToggleTrips] = useState(true)

  // fonction pour le boléen du toggle
  const handleTrips = () => {
    setToggleTrips(!toggleTrips)
  }

  return (
    <Center>
      <Container>
        <Box flexDirection={'row'} h="70px" alignItems="center" alignSelf="center" marginBottom="8">
          <Text>Trajets passés</Text>
          <VStack space={4}>
            <Switch isChecked={toggleTrips} size="md" onToggle={handleTrips} />
          </VStack>
          <Text>Trajets à venir</Text>
        </Box>
        <ScrollView maxW="100%" h="60%" _contentContainerStyle={{
          px: "20px",
          mb: "4",
          minW: "72"
        }}>
          <Center mt="2" mb="8">
            <Heading fontSize="xl">Mes trajets</Heading>
          </Center>
          <VStack flex="1">
            <Box h="80px">
              <Text>Mon premier trajet</Text>
            </Box>
            <Box h="80px">
              <Text>Mon deuxième trajet</Text>
            </Box>
            <Box h="80px">
              <Text>Mon troisième trajet</Text>
            </Box>
          </VStack>
        </ScrollView>
      </Container>
    </Center>
  )
}

export default UserTrips
