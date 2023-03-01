//MODELS
const Admin = require("../../models/Admin");

//Helpers
const Auth = require("../../helpers/Auth/auth");

const getInfoCamaraByUrl = require("../../helpers/getInfoCamaraByUrl");

class LoginController {
  async viewLogin(req, res) {
    const camara = await getInfoCamaraByUrl(req);
    return res.render("admin/login/loginPage", { messageReturn: null, camara });
  }

  async Login(req, res) {
    const camara = await getInfoCamaraByUrl(req);

    const { email, password } = req.body;

    if (!email || !password)
      return res.render("admin/login/loginPage", {
        messageReturn: "Credenciais inválidas",
        camara,
      });

    const existsAdmin = await Admin.findOne({
      where: { email: email, CamaraId: camara.id },
    });
    if (!existsAdmin)
      return res.render("admin/login/loginPage", {
        messageReturn: "O email informado está incorreto",
        camara,
      });

    if (!Auth.login(password, existsAdmin.salt, existsAdmin.hash))
      return res.render("admin/login/loginPage", {
        messageReturn: "Senha incorreta",
        camara,
      });

    req.session.admin = existsAdmin; //set cookies

    return res.redirect("/admin/home");
  }

  async Logout(req, res) {
    req.session.admin = null;
    res.redirect("/admin");
  }

  async NewAdmin(req, res) {
    const camara = await getInfoCamaraByUrl(req);
    const { email, password } = req.body;

    const senha = Auth.gerarSenha(password);

    const newAdmin = {
      email: email,
      hash: senha.hash,
      salt: senha.salt,
      CamaraId: camara.id,
    };

    const existsAdmin = await Admin.create(newAdmin);

    if (!existsAdmin) return res.status(401).json({ success: false });

    return res.status(201).json({ success: true });
  }
}

module.exports = new LoginController();
