import { Text, VStack } from 'native-base'
import React from 'react'
import { useAddTripContext } from '../../../contexts/AddTripContext'

function AddTripModalScreen3 () {
  return (
    <VStack style={{ width: '100%' }} space={8}>
      <Text style={{ width: '100%' }} fontSize={32} fontWeight='bold'>Les points de passage</Text>
    </VStack>
  )
}

export default AddTripModalScreen3
