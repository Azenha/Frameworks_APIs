'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class LivrosSchema extends Schema {
  up () {
    this.create('livros', (table) => {
      table.increments()
      table.string("titulo");
      table.string("autora");
      table.string("capa");
      table.string("isbn");
      table.timestamps()
    })
  }

  down () {
    this.drop('livros')
  }
}

module.exports = LivrosSchema
