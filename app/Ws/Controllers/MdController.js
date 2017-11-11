'use strict'

class ChatController {

  constructor(socket, request) {
    this.socket = socket
    this.request = request
  }

  * joinRoom (room, payload, socket) {
    socket.on('message', function(message){
      socket.inRoom(room).toEveryone().emit('message', message)
    })
  }

  disconnected(socket){
    console.log('disconnected : ', socket.id)
  }
}

module.exports = ChatController
