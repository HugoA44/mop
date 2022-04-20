import { Input, Text, VStack } from 'native-base'
import React from 'react'
import { useAddTripContext } from '../../../contexts/AddTripContext'

function AddTripModalScreen4 () {
  const { tripDatas, setTripDatas } = useAddTripContext()

  return (
    <VStack style={{ width: '100%' }} space={8}>
      <Text style={{ width: '100%' }} fontSize={32} fontWeight='bold'>Finalisation</Text>
      <VStack style={{ width: '100%' }} space={4}>
        <Text fontSize={24} fontWeight='bold'>Combien de personne.s peux-tu emmener ?</Text>
        <Input
          type='number'
          onChangeText={text => setTripDatas({ ...tripDatas, nbSeats: text })}
          value={tripDatas.nbSeats}
        />
      </VStack>
      <VStack style={{ width: '100%' }} space={4}>
        <Text fontSize={24} fontWeight='bold'>Donne un nom à ton trajet</Text>
<Input
          onChangeText={text => setTripDatas({ ...tripDatas, name: text })}
          value={tripDatas.name}
        />
      </VStack>
    </VStack>
  )
}

export default AddTripModalScreen4
