import axios from 'axios'

export const http = axios.create({
  baseURL: 'https://field-.herokuapp.com/'
})

// export const http = axios.create({
//   baseURL: 'http://localhost:3333'
// })

