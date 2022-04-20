import { Box, Button, Input, Text, VStack } from 'native-base'
import React, { useState } from 'react'
import { useAddTripContext } from '../../../contexts/AddTripContext'
import DateTimePicker from '@react-native-community/datetimepicker'

function AddTripModalScreen2 () {
  const { tripDatas, setTripDatas } = useAddTripContext()
  const [showDateTimePicker, setShowDateTimePicker] = useState(false)

  const onChange = (event, selectedDate) => {
    setShowDateTimePicker(false)
    setTripDatas({ ...tripDatas, arivalDate: selectedDate })
  }

  return (
    <VStack style={{ width: '100%' }} space={8}>
      <Text style={{ width: '100%' }} fontSize={32} fontWeight='bold'>Arrivée</Text>
      <VStack style={{ width: '100%' }} space={4}>
        <Text fontSize={24} fontWeight='bold'>Quel est ton point d'arrivée ?</Text>
        <Input
          isDisabled
          value={tripDatas.arivalPoint.name}
        />
      </VStack>
      <VStack style={{ width: '100%' }} space={4}>
        <Box>
        <Text fontSize={24} fontWeight='bold'>À quelle heure veux-tu arriver ?</Text>
          <Text fontSize={16} >Nous te conseillons de prendre de la marge ;)</Text>
        </Box>
          <Button bordered onPress={() => setShowDateTimePicker(!showDateTimePicker)}>
           <Text color='white'>{tripDatas.arivalDate.toLocaleTimeString()}</Text>
         </Button>
        {showDateTimePicker && (
          <DateTimePicker
            mode='time'
            value={tripDatas.arivalDate || tripDatas.departureDate}
            is24Hour={true}
            onChange={onChange}
          />
        )}
      </VStack>
    </VStack>
  )
}

export default AddTripModalScreen2
