import express from 'express';
const WebApi = express.Router();

//Neural IA
import Aria from './../aria/Aria.js';
//DataBase
import client from './../mysql/client.js';
const MySQLClient = client.MySQLClient;
const dbConfig = client.dbConfig;


//Data base control

WebApi.get('/sql-test', async (req, res) => {
    const client = new MySQLClient(dbConfig);
    try {
      // Conectar a la base de datos
      await client.connect();
      console.log(' MySQLClient | Client Connected ');      
      await client.disconnect();
      console.log(' MySQLClient | Client Disconected ');
      res.send({
          errno: false,
          code: "Successful connection",
      });
    } catch (error) {
      console.error('Error:', error);
      res.send(error);
    }
});


WebApi.post('/sql-execute', async (req, res) => {
    const sql_query = req.body.sql_query;

    console.log( req.body.sql_query );
    if( req.body.sql_query == undefined || req.body.sql_query == ''){
        res.send({
          errno: -2,
          results: "sql_query: empty"
        });
        return false;
    }

    const client = new MySQLClient(dbConfig);
    try {
      // Conectar a la base de datos
      await client.connect();
      console.log('MySQLClient | Client Connected ');
      const results = await client.executeQuery(sql_query);

      // Desconectar de la base de datos
      await client.disconnect();
      console.log('MySQLClient | Client Disconected ');

      res.send({
        errno: false,
        results: results
      });

    } catch (error) {
      console.log('MySQLClient | Error occurred:', error.toString());
      res.send(error);
    } finally {
      // Verifica si la conexión está abierta y ciérrala
      if (client && client.disconnect) {
        try {
          await client.disconnect();
          console.log('MySQLClient | Client Disconnected');
        } catch (disconnectError) {
          console.log('MySQLClient | Error disconnecting client:', disconnectError.toString() );
        }
      }
    }
});

// IA Model

WebApi.post('/message', async (req, res) => {
    const inputMessage = req.body.message;
    try {
        // Realizamos la inferencia con la pregunta proporcionada
        const aria = new Aria();
        const respuesta = await aria.Inference({ prompt: inputMessage });
        console.log('IA | Response LM Studio |', respuesta);
        res.json({ message: `${respuesta}`, error: false });
    } catch (error) {
        //console.error('Error:', error);
        res.json({ message: `${error}`, error:true });
    }
});

export default WebApi;