import React, { createContext, useContext, useReducer } from 'react'
import Geolocation from 'react-native-geolocation-service'

const GeoContext = createContext()

const actionTypes = {
  SET_GEOLOCATION: 'SET_GEOLOCATION',
  RESET_GEOLOCATION: 'RESET_GEOLOCATION',
  ERROR: 'ERROR'
}

const initialState = {
  data: null,
  loading: null,
  error: null
}

const GeoReducer = (state, action) => {
  switch (action.type) {
    case actionTypes.SET_GEOLOCATION:
      return {
        ...initialState, data: action.data
      }
    case actionTypes.RESET_GEOLOCATION:
      return initialState
    case actionTypes.ERROR:
      return {
        ...initialState, error: action.error
      }
    default:
      throw new Error(`Unhandled action type: ${action.type}`)
  }
}

const GeoProvider = ({ children }) => {
  const [state, dispatch] = useReducer(GeoReducer, initialState)
  return <GeoContext.Provider value={{ state, dispatch }}>{children}</GeoContext.Provider>
}

const useGeo = () => {
  const context = useContext(GeoContext)
  if (!context) throw new Error('useGeo must be used inside a GeoProvider')
  return context
}

const getLocation = (dispatch) => {
  try {
    Geolocation.getCurrentPosition((position) => {
      dispatch({
        type: actionTypes.SET_GEOLOCATION,
        data: position
      })
    },
    (error) => {
      dispatch({
        type: actionTypes.ERROR,
        error: error
      })
    },
    { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 })
  } catch (error) {
    dispatch({
      type: actionTypes.ERROR,
      error: error
    })
  }
}

const setLocation = (dispatch, data) => {
  try {
    dispatch({
      type: actionTypes.SET_GEOLOCATION,
      data: data
    })
  } catch (error) {
    console.error(error)
  }
}

export {
  useGeo,
  GeoProvider,
  actionTypes,
  getLocation,
  setLocation
}
