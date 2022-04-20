import axios from 'axios'

const api = axios.create({
  timeout: 10000
})

/**
 *
 * @param {props} immat on récupère l'immatriculation que l'utilisateur a saisi
 * @returns
 */
const getCarInfos = async ({ immat }) => {
  try {
    const response = await api.get(`https://www.yakarouler.com/car_search/immat?immat=${immat}&name=undefined&redirect=true`)
    return response.data
  } catch (error) {
    console.error(error)
  }
}

export {
  getCarInfos
}
