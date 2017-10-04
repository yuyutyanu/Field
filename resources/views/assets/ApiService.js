import axios from 'axios'

var http = axios.create({
  baseURL: 'http://localhost:3333'
});

export const send = function(method, url, payload = null, token = null){
  var headers = {}
  if(token){
    headers = {headers: {'Authorization': token}}
  }

  return http[method](url, payload, headers)
}