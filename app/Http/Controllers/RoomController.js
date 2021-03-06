'use strict'
const Room = use('App/Model/Room')

class RoomController {

  *index (req, res) {
    const rooms = yield Room.all()

    if (rooms) {
      return res.json(rooms)
    }
    return res.send('Sorry, cannot find the selected found')
  }

  *show (req, res) {
    const id = req.param('id')
    const RoomID = yield req.session.get('RoomID')

    if (RoomID == id) {
      return yield res.sendView('room', {room_id: id})
    } else {
      return res.redirect(`/login/${req.param('id')}`)
    }
  }

  *store (req, res) {
    let room = new Room()
    room.password = req.input('password')
    yield room.save()
    yield req.session.put('RoomID', room.id)
    return res.json({room_id: room.id})
  }
}

module.exports = RoomController
