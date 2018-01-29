'use strict'

class MdController {

  constructor(socket, request) {
    this.socket = socket
    this.request = request
  }

  * joinRoom (room, payload, socket) {
    socket.on('message', function(message){
      socket.inRoom(room).exceptMe().emit('message', message)
    })
  }

  disconnected(socket){
    console.log('disconnected : ', socket.id)
  }
}

module.exports = MdController
