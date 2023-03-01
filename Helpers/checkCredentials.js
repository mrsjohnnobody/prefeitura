const Admin = require("../models/Admin");

// middleware to validate credentials
const checkCredentials = async (req, res, next) => {
  try {
    if (!req.session.admin)
      return res.redirect("/admin");

    const existsAdmin = await Admin.findByPk(req.session.admin.id);

    if (!existsAdmin)
      return res.redirect("/admin");

    if (existsAdmin.salt != req.session.admin.salt)
      return res.redirect("/admin");

    if (existsAdmin.hash != req.session.admin.hash)
      return res.redirect("/admin");

    next();
  } catch (err) {
    res.redirect('/admin');
  }
};

module.exports = checkCredentials;