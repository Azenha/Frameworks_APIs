'use strict'

const User = use("App/Models/User");
const { validate } = use("Validator");


class UserController {
    criar({ view }) {
        return view.render("usuario.criar");
    }

    async guardar({ auth, session, request, response }) {
        const validar = await validate(request.all(), {
            username: "required",
            email: "required",
            password: "required|min:6"
        });

        if (validar.fails()) {
            session.withErrors(validar.notification()).flashAll();
            return response.redirect("back");
        }

        const dados = request.only(["username", "email", "password"]);

        const usuario = await User.create(dados);

        session.flash({ notification: "Usuário criado com sucesso!" });

        return response.redirect("/");
    }


}


module.exports = UserController
