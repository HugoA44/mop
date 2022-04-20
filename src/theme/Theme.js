import { extendTheme } from 'native-base'

const colors = {
  primary: {
    50: '#BEC6DF',
    100: '#ABB8DE',
    200: '#99AADD',
    300: '#869CDD',
    400: '#738EDC',
    500: '#456fe8',
    600: '#365BC9',
    700: '#1F3E9A',
    800: '#0F2B7A',
    900: '#00175B'
  },
  background: '#fff'
}

const getTheme = () => {
  return extendTheme({
    colors: {
      ...colors
    },
    components: {
      Text: {
        baseStyle: (props) => {
          return {
            color: '#0F172A'
          }
        }
      },
      Container: {
        baseStyle: (props) => {
          return {
            backgroundColor: '#fff',
            color: '#0F172A'
          }
        }
      },
      Input: {
        baseStyle: (props) => {
          return {
            backgroundColor: '#fff',
            color: '#0F172A'
          }
        }
      },
      FormControlLabel: {
        baseStyle: (props) => {
          return {
            backgroundColor: '#fff',
            color: '#0F172A'
          }
        }
      }
    }
  })
}

export {
  getTheme,
  colors
}
