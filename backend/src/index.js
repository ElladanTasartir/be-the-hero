const express = require('express');
// importa o microframework (express) para usar suas funcionalidades
// esse micro framework lida com rotas
const cors = require('cors');
//um pacote que permite controlar quem acessa a api
const routes = require('./routes'); //o ponto barra significa que é um arquivo e não um pacote, se não
// assim como no exemplo de cima no express, ele buscaria por um pacote ao invés de um arquivo local


const app = express();
// declara uma variável da nossa aplicação
app.use(cors()); // se no futuro, chegar à hospedar em algum lugar,
//é só colocar um objeto js {
//  origin: "diretório do site"
//}
app.use(express.json());
// Isso faz com que o back-end entenda json, então ele vai converter o json em um objeto js

app.use(routes);

//Bancos de dados:

//SQL: MySQL, SQLite, PostgreSQL, Ocracle, Microsoft SQL Server
//NoSQL: MongoDB, CouchDB, etc

app.listen(3333);
// a aplicação está escutando à porta 3333, ou seja, se digitarmos localhost:3333 chegaremos ao endereço da app
