import axios from 'axios'

export default () => {
  return axios.create({
    baseURL: `https://hospital-server.herokuapp.com/`
  })
}
