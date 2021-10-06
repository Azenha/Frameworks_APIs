("use strict")

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

// Proteçao de rotas
Route.group(() => {
    // Sessão
    Route.get("sair", "SessaoController.sair");
    // Cadastrar Usuários
    Route.get("cadastrar", "UsuarioController.criar");
    Route.post("cadastrar", "UsuarioController.guardar");
    // Livros
    Route.get("livros/cadastrar", "LivroController.cadastrar");
    Route.post("livros", "LivroController.guardar");
    Route.get("/livros/:id/editar", "LivroController.editar");
    Route.put("/livros/:id", "LivroController.atualizar");
    Route.delete("/livros/:id", "LivroController.deletar");
}).middleware(["auth"]);

// Livros
Route.get("/", "LivroController.indice");
Route.get("livros/:id", "LivroController.individual");

// Sessão
Route.get("login", "SessaoController.criar");
Route.post("login", "SessaoController.guardar");

