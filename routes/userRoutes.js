const { Router } = require("express");
const routes = Router();

//CONTROLLERS
const newsController = require("../controllers/user/newsController");
const videoController = require("../controllers/user/videoController");
const parlamentarController = require("../controllers/user/parlamentarController");
const tranparenciaController = require("../controllers/user/transparenciaController");
const mesaDiretoraController = require("../controllers/user/mesaDiretoraController");
const commissionController = require("../controllers/user/commissionController");
const homeController = require("../controllers/user/homeController");
const staticController = require("../controllers/user/staticController");
const gestaoFiscalController = require("../controllers/user/gestaoFiscalController");
const leiOrganicaController = require("../controllers/user/leiOrganicaController");
const regimentoController = require("../controllers/user/regimentoController");
const dicionarioController = require("../controllers/user/dicionarioController");
const eSicController = require("../controllers/user/eSicController");
const ouvidoriaController = require("../controllers/user/ouvidoriaController");
const acessibilidadeController = require("../controllers/user/acessibilidadeController");
const faleConoscoController = require("../controllers/user/faleConoscoController");
const publicacoesController = require("../controllers/user/publicacoesController");
const decretosController = require("../controllers/user/decretosController");
const veiculosController = require("../controllers/user/veiculosController");
const perguntasController = require("../controllers/user/perguntasController");
const leisController = require("../controllers/user/leisController");
const portariasController = require("../controllers/user/portariasController");
const diariasController = require("../controllers/user/diariasController");
const prestacaoContasController = require("../controllers/user/prestacaoContasController");
const legislaturaController = require("../controllers/user/legislaturaController");
const sessoesController = require("../controllers/user/sessoesController");
const materiasController = require("../controllers/user/materiasController");
const licitacoesController = require("../controllers/user/licitacoesController");
const contratosController = require("../controllers/user/contratosController");
const dadosAbertosController = require("../controllers/user/dadosAbertosController");
const mapaSiteController = require("../controllers/user/mapaSiteController");
const glossarioController = require("../controllers/user/glossarioController");
const obrasController = require("../controllers/user/obrasController");

routes.get("/commission", commissionController.viewCommission);
routes.get("/mesaDiretora", mesaDiretoraController.viewMesaDiretora);
routes.get("/transparencia", tranparenciaController.viewTransparencia);
routes.get("/parlamentar", parlamentarController.viewParlamentares);
routes.get("/parlamentar/:id", parlamentarController.viewParlamentarById);
routes.get(
  "/parlamentarMateriaInfo/:id",
  parlamentarController.getParlamentarMateriaInfo
);
routes.get("/videos", videoController.viewVideos);
routes.get("/videosList", videoController.getVideosList);
routes.get("/news/:id", newsController.viewNewsById);
routes.get("/news", newsController.viewNews);
routes.get("/camara", staticController.viewCamara);
routes.get("/infoParlamentar", staticController.viewInfoParlamentar);
routes.get("/infoCamara", staticController.viewInfoCamara);
routes.get(
  "/historicOfParlamentares",
  parlamentarController.viewHistoricoParlamentares
);
routes.get("/gestaoFiscal", gestaoFiscalController.viewGestaoFiscal);
routes.get("/leiOrganica", leiOrganicaController.viewleiOrganica);
routes.get("/regimento", regimentoController.viewregimento);
routes.get("/dicionarioList", dicionarioController.getDicionarioList);
routes.get("/dicionario", dicionarioController.viewdicionario);
routes.get("/eSic", eSicController.vieweSic);
routes.get("/ouvidoria", ouvidoriaController.viewouvidoria);
routes.get("/acessibilidade", acessibilidadeController.viewacessibilidade);
routes.get("/faleConosco", faleConoscoController.viewfaleConosco);
routes.get("/publicacoes", publicacoesController.viewpublicacoes);
routes.get("/decretos", decretosController.viewdecretos);
routes.get("/veiculos", veiculosController.viewVeiculos);
routes.get("/perguntas", perguntasController.viewperguntas);
routes.get("/leis", leisController.viewleis);
routes.get("/portarias", portariasController.viewportarias);
routes.get("/diarias", diariasController.viewdiarias);
routes.get("/prestacaoContas", prestacaoContasController.viewprestacaoContas);
routes.get("/legislatura", legislaturaController.viewlegislatura);
routes.get("/sessoesList", sessoesController.getSessoesList);
routes.get("/sessoes", sessoesController.viewSessoes);
routes.get("/sessao/:id", sessoesController.viewSessoesId);
routes.get("/materia/:id", materiasController.viewEditMateriaById);
routes.get("/licitacao/:id", licitacoesController.viewLicitacaoById);
routes.get("/licitacoes", licitacoesController.viewlicitacoes);
routes.get("/contratos", contratosController.viewcontratos);
routes.get("/dadosAbertos", dadosAbertosController.viewdadosAbertos);
routes.get("/mapaSite", mapaSiteController.viewmapaSite);
routes.get("/glossarioList", glossarioController.getGlossarioList);
routes.get("/glossario", glossarioController.viewglossario);
routes.get("/obras", obrasController.viewObras);
routes.get("/obras/:id", obrasController.viewObrasId);
routes.get("/", homeController.viewHome);

// routes.get('*', function(req, res){
//     res.send('what???', 404);
// });

module.exports = routes;
