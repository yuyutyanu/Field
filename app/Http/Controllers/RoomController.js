'use strict'

class RoomController {
  *index(request, response){
    yield response.sendView('room', {room_id: request.param('room_id')})
  }
}

module.exports = RoomController
