
exports.up = function (knex) { //MÉTODO UP é responsável pela criação da tabela
    return knex.schema.createTable('ongs', function (table) {
        table.string('id').primary();
        table.string('name').notNullable();
        table.string('email').notNullable();
        table.string('whatsapp').notNullable();
        table.string('city').notNullable();
        table.string('uf', 2).notNullable();
    });
};

exports.down = function (knex) { //MÉTODO RESPONSÁVEL POR LIDAR COM PROBLEMAS
    return knex.schema.dropTable('ongs');
};
