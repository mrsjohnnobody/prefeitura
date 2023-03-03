const { Router } = require("express");
const routes = Router();

//CONTROLLERS
const loginController = require("../controllers/admin/loginController");
const homeController = require("../controllers/admin/homeController");
const noticiaController = require("../controllers/admin/noticiaController");
const parlamentController = require("../controllers/admin/parlamentarController");
const commissionController = require("../controllers/admin/commissionController");
const gestaoFiscalController = require("../controllers/admin/gestaoFiscalController");
const licitacaoController = require("../controllers/admin/licitacaoController");
const leisController = require("../controllers/admin/leisController");
const contratosController = require("../controllers/admin/contratosController");
const prestacaoContasController = require("../controllers/admin/prestacaoContasController");
const sessoesController = require("../controllers/admin/sessoesController");
const materiaController = require("../controllers/admin/materiaController");
const diariasController = require("../controllers/admin/diariasController");
const veiculosController = require("../controllers/admin/veiculosController");
const obrasController = require("../controllers/admin/obrasController");
const medicoesController = require("../controllers/admin/medicoesController");

//MIDDLEWARE
const checkCredentials = require("../helpers/checkCredentials");

//UPLOAD FILES
const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, new Date().toISOString().replace(/:/g, "-") + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/png" ||
    file.mimetype === "application/pdf" ||
    file.mimetype === "image/jpg"
  )
    cb(null, true);
  else cb(null, false);
};

const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 50 /*limit 50mb*/ },
  fileFilter: fileFilter,
});
~routes.get("/diaria/:id", checkCredentials, diariasController.viewDiariaId);
routes.get(
  "/deleteDiaria/:id",
  checkCredentials,
  diariasController.deleteDiaria
);
routes.get("/diariasList", checkCredentials, diariasController.getDiariasList);
routes.post(
  "/addDiaria",
  checkCredentials,
  upload.single("pdfFile"),
  diariasController.addDiaria
);
routes.get("/diarias", checkCredentials, diariasController.viewDiarias);
routes.post("/editSessao/:id", checkCredentials, sessoesController.editSessao);
routes.post("/addMateria", checkCredentials, materiaController.createMateria);
routes.get(
  "/deleteMateria/:id",
  checkCredentials,
  materiaController.deleteMateria
);
routes.post("/addTramite", checkCredentials, materiaController.createTramite);
routes.get(
  "/deleteTramite/:id",
  checkCredentials,
  materiaController.deleteTramite
);
routes.get(
  "/editMateria/:id",
  checkCredentials,
  materiaController.viewEditMateriaById
);
routes.get("/sessoesList", checkCredentials, sessoesController.getSessoesList);
routes.post("/addSessao", checkCredentials, sessoesController.addSessoes);
routes.get(
  "/deleteSessao/:id",
  checkCredentials,
  sessoesController.deleteSessao
);
routes.get(
  "/editSessao/:id",
  checkCredentials,
  sessoesController.viewSessoesId
);
routes.get("/sessoes", checkCredentials, sessoesController.viewSessoes);
routes.get(
  "/deletePrestacaoContas/:id",
  checkCredentials,
  prestacaoContasController.deletePrestacaoContas
);
routes.post(
  "/editPrestacaoContas/:id",
  checkCredentials,
  upload.single("pdfFile"),
  prestacaoContasController.viewPrestacaoContas
);
routes.post(
  "/addPrestacaoContas",
  checkCredentials,
  upload.single("pdfFile"),
  prestacaoContasController.addPrestacaoContas
);
routes.get(
  "/prestacaoContas",
  checkCredentials,
  prestacaoContasController.viewPrestacaoContas
);
routes.post(
  "/addContrato",
  checkCredentials,
  upload.single("pdfFile"),
  contratosController.createContrato
);
routes.post(
  "/editContrato/:id",
  checkCredentials,
  contratosController.viewContratos
);
routes.get(
  "/deleteContrato/:id",
  checkCredentials,
  contratosController.deleteContrato
);
routes.get("/contratos", checkCredentials, contratosController.viewContratos);
routes.post(
  "/addLei",
  checkCredentials,
  upload.single("pdfFile"),
  leisController.createLei
);
routes.get("/deleteLei/:id", checkCredentials, leisController.deleteLei);
routes.get("/leis", checkCredentials, leisController.viewleis);
routes.get(
  "/deleteLicitacao/:id",
  checkCredentials,
  licitacaoController.deleteLicitacao
);
routes.post(
  "/editLicitacao/:id",
  checkCredentials,
  upload.array("uploadFiles[]", 20),
  licitacaoController.editLicitacao
);
routes.post(
  "/addLicitacao",
  checkCredentials,
  licitacaoController.createLicitacao
);
routes.get(
  "/editLicitacao/:id",
  checkCredentials,
  licitacaoController.viewEditLicitacao
);
routes.get("/licitacoes", checkCredentials, licitacaoController.viewLicitacoes);
routes.get(
  "/gestaoFiscal",
  checkCredentials,
  gestaoFiscalController.viewGestaoFiscal
);
routes.post(
  "/addGestaoFiscal",
  checkCredentials,
  upload.single("pdfFile"),
  gestaoFiscalController.addGestaoFiscal
);
routes.post(
  "/editGestaoFiscal/:id",
  checkCredentials,
  upload.single("pdfFile"),
  gestaoFiscalController.editGestaoFiscal
);
routes.get(
  "/deleteGestaoFiscal/:id",
  checkCredentials,
  gestaoFiscalController.deleteGestaoFiscal
);
routes.get(
  "/commission",
  checkCredentials,
  commissionController.viewCommission
);
routes.post(
  "/addCommission",
  checkCredentials,
  commissionController.addCommission
);
routes.get(
  "/editCommission/:id",
  checkCredentials,
  commissionController.editCommission
);
routes.get(
  "/deleteCommission/:id",
  checkCredentials,
  commissionController.deleteCommission
);
routes.get(
  "/parlamentares",
  checkCredentials,
  parlamentController.viewParlamentares
);
routes.post(
  "/addParlamentar",
  checkCredentials,
  upload.single("image"),
  parlamentController.addParlamentar
);
routes.post(
  "/editParlamentar/:id",
  checkCredentials,
  upload.single("changeImage"),
  parlamentController.editParlamentar
);
routes.get(
  "/deleteParlamentar/:id",
  checkCredentials,
  parlamentController.deleteParlamentar
);
routes.post(
  "/addParlamentar",
  checkCredentials,
  upload.single("image"),
  parlamentController.addParlamentar
);
routes.get("/noticia/:id", checkCredentials, noticiaController.viewNoticiaId);
routes.post(
  "/addNoticia",
  checkCredentials,
  upload.single("image"),
  noticiaController.addNoticia
);
routes.get(
  "/deleteNoticia/:id",
  checkCredentials,
  noticiaController.deleteNoticia
);
routes.get("/noticias", checkCredentials, noticiaController.viewNoticias);
routes.post("/addVeiculo", checkCredentials, veiculosController.createVeiculo);
routes.get("/veiculos", checkCredentials, veiculosController.viewVeiculos);
routes.post("/addMedicao", checkCredentials, medicoesController.createMedicao);
routes.post(
  "/editMedicao/:id",
  checkCredentials,
  medicoesController.editMedicao
);
routes.get(
  "/editMedicao/:id",
  checkCredentials,
  medicoesController.viewMedicaoId
);
routes.post("/addObra", checkCredentials, obrasController.createObras);
routes.post("/editObra/:id", checkCredentials, obrasController.editObras);
routes.get("/editObra/:id", checkCredentials, obrasController.viewObrasId);
routes.get("/obras", checkCredentials, obrasController.viewObras);
routes.get("/home", checkCredentials, homeController.viewHome);
routes.get("/logout", loginController.Logout);
routes.post("/login", loginController.Login);
routes.post("/NewAdminNEDDIH", loginController.NewAdmin);
routes.get("/", loginController.viewLogin);

//The 404 Route (ALWAYS Keep this as the last route)
// routes.get('*', function(req, res){
//   res.send('what???', 404);
// });

module.exports = routes;
