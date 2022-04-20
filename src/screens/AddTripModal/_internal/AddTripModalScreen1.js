import { Button, Input, Text, VStack } from 'native-base'
import React, { useState } from 'react'
import { useAddTripContext } from '../../../contexts/AddTripContext'
import DateTimePicker from '@react-native-community/datetimepicker'

function AddTripModalScreen1 () {
  const { tripDatas, setTripDatas } = useAddTripContext()
  const [showDateTimePicker, setShowDateTimePicker] = useState(false)

  const onChange = (event, selectedDate) => {
    setShowDateTimePicker(false)
    setTripDatas({ ...tripDatas, departureDate: selectedDate })
  }

  return (
    <VStack style={{ width: '100%' }} space={8}>
      <Text style={{ width: '100%' }} fontSize={32} fontWeight='bold'>Départ</Text>
      <VStack style={{ width: '100%' }} space={4}>
        <Text fontSize={24} fontWeight='bold'>D'où pars-tu ?</Text>
        <Input
          onChangeText={text => setTripDatas({ ...tripDatas, departurePoint: text })}
          value={tripDatas.departurePoint}
        />
      </VStack>
      <VStack style={{ width: '100%' }} space={4}>
        <Text fontSize={24} fontWeight='bold'>Quand ?</Text>
          <Button bordered onPress={() => setShowDateTimePicker(!showDateTimePicker)}>
           <Text color='white'>{tripDatas.departureDate.toLocaleDateString()} à {tripDatas.departureDate.toLocaleTimeString()}</Text>
         </Button>
        {showDateTimePicker && (
          <DateTimePicker
            value={tripDatas.departureDate}
            is24Hour={true}
            mode="datetime"
            onChange={onChange}
          />
        )}
      </VStack>
    </VStack>
  )
}

export default AddTripModalScreen1
