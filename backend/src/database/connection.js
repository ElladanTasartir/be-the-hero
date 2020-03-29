const knex = require('knex');
const configuration = require('../../knexfile');
// configuration vai estar recebendo os dados do arquivo local knexfile
// o ../ significa pra voltar pastas (comando de bash mesmo) e achar o arquivo, ou seja
// ../(voltar uma pasta)../(voltar mais uma pasta)/knexfile(nome do arquivo)

const connection = knex(configuration.development);
// nossa conexão vai receber as configurações do knexfile na aba de development

module.exports = connection;
// exportar porque será necessário se comunicar com o banco em outros arquivos