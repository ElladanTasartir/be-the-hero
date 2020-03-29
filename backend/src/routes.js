const express = require('express');
// importa o microframework (express) para usar suas funcionalidades
// esse micro framework lida com rotas
const OngController = require('./controllers/OngController');
const IncidentController = require('./controllers/IncidentController');
const ProfileController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController')

const routes = express.Router();
// desacoplando o módulo de rotas do express em uma nova variável para manipular

//Métodos HTTP:

//Get: Buscar uma informação do back-end, sempre que houver retorno de uma informação
//Post: Criar uma informação no back-end
//Put: Alterar uma informação no back-end
//Delete: Deletar uma informação no back-end

//Tipos de Parâmetros:

//Query Params: Parâmetros nomeados enviados na rota após "?" (Filtros, paginação) - para acesasr, request.query;
//Route Params: Parâmetros utilizados para identificar recursos  - para acessar, request.params;
            //  No Route Params não se pode enviar mais parâmetros do que estão sendo esperados
//Request Body: Corpo da requisição, utilizado para criar ou alterar recursos - para acessar, request.body;

routes.post('/sessions', SessionController.create);

//Método get é acessado sempre que acessamos a rota no navegador
routes.get('/ongs', OngController.index);
routes.post('/ongs', OngController.create);

routes.get('/profile', ProfileController.index);

routes.get('/incidents', IncidentController.index);
routes.post('/incidents', IncidentController.create);
routes.delete('/incidents/:id', IncidentController.delete); //recebe um route param porque precisa da informação do id presente para pegar e deletar
                                                            //o incidente


module.exports = routes; 
//maneira para exportar variáveis de um arquivo em node