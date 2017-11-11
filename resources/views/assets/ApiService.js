import axios from 'axios'

export const http = axios.create({
  baseURL: process.env.PORT || 'http://localhost:3333'
});

