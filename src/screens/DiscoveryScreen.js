import React from 'react'
import { Box, Container, Heading } from 'native-base'
import ProfilNotCompleteAlert from '../components/alerts/ProfilNotCompleteAlert'
import { useAuth } from '../contexts/AuthContext'
import { homeStyle } from '../theme/Styles'
import _ from 'underscore'

function DiscoveryScreen ({ navigation }) {
  const { state } = useAuth()

  const isProfileComplete = () => {
    return (
      !_.isEmpty(state.user.phone) &&
      !_.isEmpty(state.user.school) &&
      !_.isEmpty(state.user.status) &&
      !_.isEmpty(state.user.bio)
    )
  }
  return (
    <>
      {!isProfileComplete()
        ? (
          <ProfilNotCompleteAlert
            onPressGoProfile={() => navigation.navigate('Profile')}
          />
          )
        : null}
      <Container w='100%'>
        <Box style={homeStyle.container}>
          <Heading style={homeStyle.heading}>
            Hey! {state.user.firstName} 🤙
          </Heading>
        </Box>
      </Container>
    </>
  )
}

export default DiscoveryScreen
