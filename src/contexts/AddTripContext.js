import React, { createContext, useContext, useState, useMemo } from 'react'
import AddTripModalScreen1 from '../screens/AddTripModal/_internal/AddTripModalScreen1'
import AddTripModalScreen2 from '../screens/AddTripModal/_internal/AddTripModalScreen2'
import AddTripModalScreen3 from '../screens/AddTripModal/_internal/AddTripModalScreen3'
import AddTripModalScreen4 from '../screens/AddTripModal/_internal/AddTripModalScreen4'

const AddTripContext = createContext()

export const useAddTripContext = () => {
  const context = useContext(AddTripContext)
  if (!context) {
    throw new Error(
      'useAddTripContext must be inside a AddTripProvider'
    )
  }
  return context
}

export const AddTripProvider = ({ children }) => {
  const steps = [
    {
      Component: AddTripModalScreen1
    },
    {
      Component: AddTripModalScreen2
    },
    // {
    //   Component: AddTripModalScreen3
    // },
    {
      Component: AddTripModalScreen4
    }
  ]

  const [activeIndex, setActiveIndex] = useState(0)

  const handleNext = () => {
    setActiveIndex((prevActiveIndex) => prevActiveIndex + 1)
  }

  const handleBack = () => {
    setActiveIndex((prevActiveIndex) => prevActiveIndex - 1)
  }

  const [tripDatas, setTripDatas] = useState({
    title: null,
    description: null,
    pilot: null,
    departurePoint: {
      name: null,
      lat: null,
      long: null
    },
    arivalPoint: {
      name: 'Campus Eduservice',
      lat: null,
      long: null
    },
    waypoints: null,
    nbSeats: null,
    departureDate: new Date(),
    arivalDate: new Date()
  })

  const value = useMemo(
    () => ({
      steps,
      activeIndex,
      setActiveIndex,
      handleNext,
      handleBack,
      tripDatas,
      setTripDatas
    }),
    [
      activeIndex,
      setActiveIndex,
      handleNext,
      handleBack, tripDatas, setTripDatas
    ]
  )

  return (
    <AddTripContext.Provider value={value}>
      {children}
    </AddTripContext.Provider>
  )
}
