import mysql from 'mysql2';
import dotenv from 'dotenv';

class MySQLClient {
  constructor(config) {
    this.connection = mysql.createConnection(config);
  }

  connect() {
    return new Promise((resolve, reject) => {
      this.connection.connect((err) => {
        if (err) {
          reject(err);
        } else {
          resolve('Connected to MySQL database');
        }
      });
    });
  }

  disconnect() {
    return new Promise((resolve, reject) => {
      this.connection.end((err) => {
        if (err) {
          reject(err);
        } else {
          resolve('Disconnected from MySQL database');
        }
      });
    });
  }

  executeQuery(query) {
    return new Promise((resolve, reject) => {
      this.connection.query(query, (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
  }
}

dotenv.config({ path: ".env" });
const dbConfig = {
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  port: process.env.PORT,
};

const client = { MySQLClient, dbConfig };
export default client;