import { Avatar, Badge, Box, Image, Text, VStack } from 'native-base'
import React from 'react'
import Icon from 'react-native-vector-icons/Entypo'
import { colors } from '../../theme/Theme'

function Trip ({ trip }) {
  return (

      <Box flex={2} py={3} px={8}>

        <Text fontSize="md" style={{ backgroundColor: colors.primary[500], color: 'white', padding: 5, position: 'absolute', right: 45, top: 25, zIndex: 10 }}>12h30 à 14h</Text>
        <Image style={{ width: '100%', height: 110 }} source={{ uri: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1420&q=80' }}/>
        <Text fontSize="lg" fontWeight={'bold'}>La canaille</Text>
        <Box flexDirection="row">

        <Icon
        name= "location-pin"
          size={25}
        />
        <Text marginBottom={2} fontSize="md">6 allée d'Orléans</Text>
        </Box>

      </Box>

  )
}

export default Trip
