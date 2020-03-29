const connection = require('../database/connection')

module.exports = {
    async index(request, response) {
        //criar paginação, para retornar os incidentes, conforme o scroll acontece
        const { page = 1 } = request.query; //tenta buscar os dados da página 1

        const [count] = await connection('incidents') //já que o count retorna um array, se você só circundar com colchetes
        .count();                                     //ele retorna apenas o primeiro valor desse array;

        const incidents = await connection('incidents').join('ongs', 'ongs.id', '=', 'incidents.ong_id')
        .limit(5).offset((page - 1) * 5).select([
            'incidents.*',
            'ongs.name',
            'ongs.email',
            'ongs.whatsapp',
            'ongs.city', 
            'ongs.uf']); 
        //o limit busca apenas 5 registros o offset escolhe quantos dados pular
        //então de acordo com a página, ele mostra os 5 primeiros
        response.header('X-Total-Count', count['count(*)']);
        //response.header serve para retornarmos o valor no header da resposta, ao invés da request
        //recebe como parâmetros o nome da resposta, e, já que o count retorna um objeto com 'count(*)' como seu atributo
        //chamamos o count['count(*)'] para acessar esse atributo

        return response.json(incidents);
    },

    async create(request, response) {
        const { title, description, value } = request.body; //isso vai estar no corpo
        const ong_id = request.headers.authorization;   //pelo fato do id da ong logada ser algo que não vai ser escrito, a 
                                                        //gente precisa pegar essa informaçãonaonde fica a autenticação,
                                                        //que é o header, no caso da sintaxe, está authorization, porque é
                                                        //como colocamos no insomnia o nome do header com esse valor
        const [id] = await connection('incidents').insert({ //essa variável vai receber o id, primeira variável presente 
            title,                                          //no retorno do insert, por isso que usamos apenas uma chave [id]
            description,                                    //para podermos apresentar o id que o banco gerou
            value,
            ong_id
        });

        return response.json({ id });
    },
    async delete(request, response) {
        const { id } = request.params;
        const ong_id = request.headers.authorization;

        const incident = await connection('incidents')
        .where('id', id)
        .select('ong_id')
        .first();

        if (incident.ong_id != ong_id){
            return response.status(401).json({ error: 'Operation not permitted'}); //401 é o http status code pra 
        }                                                                          //Unauthorized

        await connection('incidents').where('id', id).delete();
        
        return response.status(204).send();                                        //204 é o http status code para No Content
    }                                                                              //quando não há o que mostrar, mas é 
                                                                                   //interessante colocar o status
}