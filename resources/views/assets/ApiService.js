import axios from 'axios'

var http = axios.create({
  baseURL: 'http://localhost:3333'
});

export const send = function (method, url, payload = null) {
    return http[method](url, payload)
}