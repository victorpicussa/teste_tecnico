const mysql = require("mysql2/promise");
const { Pool } = require('pg');

// Função para criar uma conexão ao MySQL
async function connectSQL() {
    const connection = await mysql.createConnection("mysql://admin:password@mysql/macapa");
    
    console.log("MySQL conectado!");
    return connection;
}

// Função para criar uma conexão ao PostgreSQL
async function connectPG() {
    const pool = new Pool({
        connectionString: 'postgres://admin:password@postgresql/varejao'
    });
 
    // Testa a conexão PSQL
    const client = await pool.connect();
    console.log("PostgreSQL conectado!");
 
    client.release();
    return pool.connect();
}

module.exports = {connectSQL, connectPG}