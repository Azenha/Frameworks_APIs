'use strict'

/*
|--------------------------------------------------------------------------
| LivroSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')

Factory.blueprint("App/Models/Livro", (falso) => {
  return {
    titulo: falso.sentence({ words: 5 }),
    autora: falso.name(),
    capa:
      "/sophia-baboolal-rMYrkFfw36U-unsplash.jpg",
    isbn: falso.string({ length: 10, numeric: true }),
  };
});

class LivroSeeder {
  async run () {
    const livrosFalsos = await Factory.model("App/Models/Livro").createMany(7);
  }
}

module.exports = LivroSeeder
