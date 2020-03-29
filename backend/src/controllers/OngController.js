const crypto = require('crypto');
// pacote existente dentro do node de criptografia
const connection = require('../database/connection');
//Já que a intenção dessa rota no app é criar, usamos o método post (criação)
//o async faz com que essa requisição seja asíncrona 
module.exports = {
    //listagem de ongs
    async index(request, response) {
        const ongs = await connection('ongs').select('*');

        return response.json(ongs);
    },

    async create(request, response) {// o que vem depois da barra, é o recurso, no caso, o recurso que queremos acessar
        // ou seja, se fosse routes.get('/users', [...]), estaríamos acessando o recurso de users
        // return response.send('Hello World'); retorna um hello world à nossa página, send envia strings, normalmente
        const { name, email, whatsapp, city, uf } = request.body;
        // sintaxe disso: id = crypto.randomBytes(numerodecaracteres).toString(tipo de dado);
        // ou seja, será retornado um valor aleatório em bytes, no tamanho descrito, que será covertido em uma string
        // de caracteres hexadecimal
        const id = crypto.randomBytes(4).toString('HEX');

        // conexão com o banco
        // connection(nomedaTabela)
        // o await faz com que o código espere a requisição terminar para depois continuar
        await connection('ongs').insert({
            id,
            name,
            email,
            whatsapp,
            city,
            uf,
        })
        return response.json({ id }); //retorna um objeto js, no caso, um id
    }
    // a função dentro do get recebe sempre dois parametros, primeiro a requisição e depois a resposta
    // é necessário declarar uma rota para a nossa aplicação, por isso o get. O '/' significa que ele vai pegar
    // na nossa pasta raiz da aplicação. Se quisessemos setar a aplicação para pegar uma rota específica, como contato, por exemplo,
    // é só colocar routes.get('/contato'), ou seja, acessaremos a pasta contato
}
