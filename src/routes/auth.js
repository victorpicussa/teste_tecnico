const express = require('express')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv');
const auth = express()

auth.use(express.json());
auth.use(express.urlencoded({ extended: false }));

dotenv.config();

auth.post('/', (req, res) => {
    if (req.body.user === 'macapa' && req.body.pwd === 'password') {
        const id = 1;

        // Cria um token válido por 10min
        var token = jwt.sign({ id }, process.env.TOKEN_SECRET, {
          expiresIn: 600
        });

        res.status(200).send({ auth: true, token: token });
    } else if (req.body.user === 'varejao' && req.body.pwd === 'password') {
        const id = 2;

        // Cria um token válido por 10min
        var token = jwt.sign({ id }, process.env.TOKEN_SECRET, {
          expiresIn: 600
        });

        res.status(200).send({ auth: true, token: token });
    } else {
        res.status(500).send('Login inválido!');
    }
      
})

module.exports = auth