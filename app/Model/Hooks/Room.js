'use strict'
const Hash = use('Hash')
const Room = exports = module.exports = {}

Room.encryptPassword = function * (next) {
  this.password = yield Hash.make(this.password)
  yield next
}
