const express = require('express');
const axios = require('axios');
const router = express.Router();
const mysql = require('mysql');

function createRouter() {
  const router = express.Router();
  const owner = '';

  router.post('/generateText', async function (req, res, next) {
    try {
      const {prompt} = req.body;
      console.log("request1: ", prompt);

      if (!prompt) {
        return res.status(400).send('Parametro "prompt" mancante');
      }

      const config = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer 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'
        }
      };

      const data = {
        "model": "gpt-3.5-turbo",
        "messages": [{
          "role": "user",
          "content": prompt
        }],
        "temperature": 0.7
      };
      
      const response = await axios.post('https://api.openai.com/v1/chat/completions', data, config);

      res.json(response.data);

    } catch (error) {
      console.error(error);
      res.status(500).send('Si è verificato un errore nel processamento della tua richiesta');
    }
  });

  router.post('/queryToDb', async function (req, res, next) {
    try {
    const {query} = req.body
    const connection = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: 'root',
      multipleStatements: true
    });
    console.log("query: ", query);
    connection.query(
      query,
      (error, results) => {
        if (error) {
          console.log(error);
          res.status(500).json({
            status: 'error: '+error
          });
        } else {
          
          res.status(200).json({results,query});
        }
      }
    );
    } catch (error) {
      console.log(error);
      res.status(500).json({
        status: 'error: '+error
      });
    }
  });

  return router;
}



module.exports = createRouter;