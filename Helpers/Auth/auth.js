var crypto = require('crypto');

function generateSalt() {
  return crypto.randomBytes(16).toString('hex');
};

function sha512(senha, salt) {
  var hash = crypto.createHmac('sha512', salt);
  hash.update(senha);
  var hash = hash.digest('hex');
  return {
    salt,
    hash,
  };
};

function gerarSenha(senha) {
  var salt = generateSalt(16);
  var senhaESalt = sha512(senha, salt);
  return senhaESalt // senhaESalt.salt and  senhaESalt.hash
}

function login(senhaDoLogin, saltNoBanco, hashNoBanco) {
  var senhaESalt = sha512(senhaDoLogin, saltNoBanco)
  return hashNoBanco === senhaESalt.hash;
}

exports.login = login;
exports.gerarSenha = gerarSenha;