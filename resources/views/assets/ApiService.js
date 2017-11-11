import axios from 'axios'

export const http = axios.create({
  baseURL: `${process.env.baseURL}` || 'http://localhost:3333'
});

