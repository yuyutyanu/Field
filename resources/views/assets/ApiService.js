import axios from 'axios'

const baseURL = `${location.protocol}//${location.host}/api/v1/`

export const http = axios.create({
  baseURL: baseURL
})