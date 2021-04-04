const express = require('express')
const jwtCheck = require('../utils/jwt')
const connections = require('../utils/connections')
const dotenv = require('dotenv');
const formatStringByPattern = require('format-string-by-pattern')
const insert = express()

insert.use(express.json());
insert.use(express.urlencoded({ extended: false }));

dotenv.config();

insert.post('/', jwtCheck.checker, async (req, res) => {
    if (req.body.contacts != undefined) {
        if (req.userId == 1) {
            const client = await connections.connectSQL();
            const sql = 'INSERT INTO contacts(nome, celular) VALUES ?;';
            var values = [];
    
            // Organiza os dados
            req.body.contacts.forEach(element => {
                values.push([element.name.toUpperCase(), formatStringByPattern('+55 (55) 55555-5555', element.cellphone)])
            });
    
            // Cria o sql e insere os dados
            client.query(sql, [values], function(err) {
                if (err) throw err;
                client.end();
            });        
    
            res.status(200).json({"success" : "Inserted Successfully!"});
        } else if (req.userId == 2) {
            const client = await connections.connectPG();
            
            // Cria o sql e insere os dados
            req.body.contacts.forEach(element => {
                const sql = 'INSERT INTO contacts(nome, celular) VALUES ($1, $2);';
                var values = [element.name, element.cellphone];
                client.query(sql, values);
            });
    
            res.status(200).json({"success" : "Inserted Successfully!"});
        } else {
            res.status(400).json({"message": "User not found!"});
        }
        
    } else {
        res.status(401).send({"message": "Body not found!"});
    }
})

module.exports = insert