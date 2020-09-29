exports.up = function(knex) {
  return Promise.all([
    knex.schema.createTable('papers', function(table) {
      table.increments('id').primary();
      table.string('title');
      table.string('author');

      table.timestamps(true, true);
    }),

    knex.schema.createTable('footnotes', function(table) {
      table.increments('id').primary();
      table.string('note');
      table.integer('paper_id').unsigned()
      table.foreign('paper_id')
        .references('papers.id');

      table.timestamps(true, true);
    })
  ])
};


exports.down = function(knex) {
  return Promise.all([
    knex.schema.dropTable('footnotes'),
    knex.schema.dropTable('papers')
  ]);
}
// What is Promise?
// Knex is expecting that these methods return a promise of some sort - we have to fulfill our end of the promise, and by called Promise.all, we can do multiple things and return one Promise

// # Delete and recreate the database
// psql -U postgres -h 127.0.0.1 -c 'DROP DATABASE IF EXISTS my_database;'
// psql -U postgres -h 127.0.0.1 -c 'CREATE DATABASE my_database;'
// psql -U postgres -h 127.0.0.1 -c 'GRANT CONNECT ON DATABASE my_database TO my_db_user;'
//
// # Run migrations to generate the schema
// knex migrate:latest - It's like running rails db:migrate again to get things up to date with the new migrations
