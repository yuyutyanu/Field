'use strict'


class AuthController {

  *index(req, res) {
    yield res.sendView('login', {room_id: req.param('id')})
  }

  *store(req, res) {
    const id = req.input('id')
    const password = req.input('password')

    try {
      yield req.auth.validate(id, password)
      yield req.session.put('RoomID', id)
      yield res.json({success: true})
    } catch (e) {
      res.json({success:false})
    }
  }
}

module.exports = AuthController
