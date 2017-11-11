'use strict'
const Room = use('App/Model/Room')

class MdController {

  * index (req, res) {
    const room = yield Room.find(req.param('id'))
    res.json({md: room.text})
  }

  * store (req, res) {
    let room = yield Room.find(req.param('id'))
    room.text = req.input('md')
    yield room.save()
  }
}

module.exports = MdController