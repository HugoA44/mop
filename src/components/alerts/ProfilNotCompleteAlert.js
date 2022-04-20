import React from 'react'
import {
  Alert as NativeBaseAlert,
  Box,
  Button,
  Center,
  CloseIcon,
  HStack,
  IconButton,
  Text,
  VStack
} from 'native-base'
import { useAuth } from '../../contexts/AuthContext'

/**
 * ProfilNotCompleteAlert
 * @param { props } onPressGoProfile Navigation function to profile
 * @returns { Component } Alert profil not complete
 */

function ProfilNotCompleteAlert ({ onPressGoProfile }) {
  const { state } = useAuth()

  return (
    <Center>
      <NativeBaseAlert w='100%' status='info' colorScheme='info'>
        <VStack space={2} flexShrink={1} w='100%'>
          <HStack
            flexShrink={1}
            space={2}
            alignItems='center'
            justifyContent='space-between'
          >
            <HStack flexShrink={1} space={2} alignItems='center'>
              <NativeBaseAlert.Icon />
              <Text fontSize='md' fontWeight='medium' color='coolGray.800'>
                Bienvenue {state.user.firstName} !
              </Text>
            </HStack>
            <IconButton
              variant='unstyled'
              icon={<CloseIcon size='3' color='coolGray.600' />}
            />
          </HStack>
          <Box
            pl='6'
            _text={{
              color: 'coolGray.600'
            }}
          >
            Ton profil n'est pas complet 😥 Rends-toi sur ton profil pour
            remplir les informations manquantes 🚀
          </Box>
          <Button
            size='xs'
            rounded='none'
            w='100%'
            marginTop={2}
            onPress={onPressGoProfile}
          >
            Mon profil
          </Button>
        </VStack>
      </NativeBaseAlert>
    </Center>
  )
}

export default ProfilNotCompleteAlert
