import { StyleSheet } from 'react-native'
import { colors } from '../theme/Theme'

const tabBarStyle = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 70,
    backgroundColor: colors.background,
    paddingVertical: 10,
    borderTopColor: colors.primary[500],
    borderTopWidth: 1
  },
  button: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonText: {
    textAlign: 'center',
    color: colors.primary[50],
    fontSize: 12
  },
  buttonTextSelected: {
    textAlign: 'center',
    color: colors.primary[500],
    fontSize: 12
    // fontWeight: 'bold'
  }
})

const loginStyle = StyleSheet.create({
  input: {
    marginVertical: 30
  },
  button: {
    marginVertical: 30
  }
})

const homeStyle = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    paddingVertical: 20
  },
  heading: {
    color: colors.primary[100]
  }
})

export { tabBarStyle, loginStyle, homeStyle }
