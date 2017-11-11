'use strict'

const Schema = use('Schema')

class RoomsTableSchema extends Schema {

  up () {
    this.create('rooms', (table) => {
      table.increments()
      table.string('password')
      table.text('text')
      table.timestamps()
    })
  }

  down () {
    this.drop('rooms')
  }

}

module.exports = RoomsTableSchema
