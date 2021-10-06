'use strict'

const Livro = use("App/Models/Livro");
const { validate } = use("Validator");

class LivroController {
    async indice({ view }) {
        const livros = await Livro.all();

        return view.render("livro.indice", {
            livros: livros.toJSON(),
        });
    }

    async cadastrar({ view }) {
        return view.render("livro.cadastrar");
    }

    async guardar({ request, response, session }) {
        const validar = await validate(request.all(), {
            titulo: "required",
            autora: "required",
            capa: "required",
            isbn: "required|min:10|max:10",
        });

        if (validar.fails()) {
            session.withErrors(validar.notification()).flashAll();
            return response.redirect("back");
        }


        const livro = new Livro();

        livro.titulo = request.input("titulo");
        livro.autora = request.input("autora");
        livro.capa = request.input("capa");
        livro.isbn = request.input("isbn");

        await livro.save();

        session.flash({ notification: "Livro Guardado" });

        return response.redirect("/");
    }

    async individual({ params, view }) {
        const livro = await Livro.find(params.id);

        return view.render("livro.individual", {
            livro,
        });
    }

    async editar({ params, view }) {
        const livro = await Livro.find(params.id);

        return view.render("livro.editar", {
            livro,
        });
    }

    async atualizar({ params, request, response, session }) {
        const livro = await Livro.find(params.id);

        const validar = await validate(request.all(), {
            titulo: "required",
            autora: "required",
            capa: "required",
            isbn: "required|min:10|max:10",
        });

        if (validar.fails()) {
            session.withErrors(validar.messages()).flashAll();
            return response.redirect("back");
        }

        livro.titulo = request.input("titulo");
        livro.autora = request.input("autora");
        livro.capa = request.input("capa");
        livro.isbn = request.input("isbn");

        await livro.save();

        session.flash({ notification: "Livro Atualizado" });

        return response.redirect("/");
    }

    async deletar({ params, session, response }) {
        const livro = await Livro.find(params.id);
      
        await livro.delete();
      
        session.flash({ notification: "Livro Deletado" });
      
        return response.redirect("/");
      }
      

}

module.exports = LivroController
