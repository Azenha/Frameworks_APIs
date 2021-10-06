'use strict'

class SessaoController {

    criar({ view }) {
        return view.render("sessao.criar");
    }

    async guardar({ auth, request, response, session }) {
        const { email, password } = request.all();

        try {
            await auth.attempt(email, password);
        } catch (e) {
            session.flashExcept(["password"]);

            session.flash({
                error: "Credenciais não encontradas.",
            });

            return response.redirect("login");
        }

        session.flash({ notification: "Login com sucesso" });
        return response.redirect("/");
    }

    async sair({ auth, response, session }) {
        await auth.logout();
        session.flash({ notification: "Saiu com sucesso" });

        return response.redirect("/");
    }



}

module.exports = SessaoController
