import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { useAuth } from '../contexts/AuthContext'

import LoginScreen from '../screens/LoginScreen'
import RegisterScreen from '../screens/RegisterScreen'
import DiscoveryScreen from '../screens/DiscoveryScreen'
import TabBar from './TabBar'
import ProfileScreen from '../screens/ProfileScreen'
import LinesScreen from '../screens/LinesScreen'
import AddTripModal from '../screens/AddTripModal/AddTripModal'

const MainNavigator = createBottomTabNavigator()

const AuthNavigator = createNativeStackNavigator()

function AuthStack () {
  return (
    <AuthNavigator.Navigator
      initialRouteName='Login'
      screenOptions={{
        headerShown: false
      }}
    >
      <AuthNavigator.Screen name='Login' component={LoginScreen} />
      <AuthNavigator.Screen name='Register' component={RegisterScreen} />
    </AuthNavigator.Navigator>
  )
}

function MainTabNavigator () {
  return (
    <MainNavigator.Navigator
      tabBar={(props) => <TabBar {...props} />}
      screenOptions={{
        headerShown: false
      }}
    >
      <MainNavigator.Group>
        <MainNavigator.Screen name='Mon voyage' options={{ tabBarIcon: 'earth' }} component={LinesScreen} />
        <MainNavigator.Screen name='Découvrir' options={{ tabBarIcon: 'compass' }} component={DiscoveryScreen} />
        <MainNavigator.Screen name='Profil' options={{ tabBarIcon: 'person' }} component={ProfileScreen} />
      </MainNavigator.Group>
      <MainNavigator.Group screenOptions={{ presentation: 'modal' }}>
        <MainNavigator.Screen name='Modal' component={AddTripModal} />
      </MainNavigator.Group>
    </MainNavigator.Navigator>
  )
}

function Navigator () {
  const { state } = useAuth()

  if (state.user && state.token) {
    return (
      <MainTabNavigator profilIsComplete={state.phone && state.school && state.class && state.status && state.biography} />
    )
  } else {
    return (
      <AuthStack />
    )
  }
}

export default Navigator
