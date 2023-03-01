const Camara = require("../models/Camara");

const getInfoCamaraByUrl = async (req, res) => {
  try {
    const camara = await Camara.findOne({
      where: { url: req.headers["host"] },
    });

    if (!camara) throw new Error(req.headers["host"]);

    return camara;
  } catch (err) {
    console.log(err);
  }
};

module.exports = getInfoCamaraByUrl;
