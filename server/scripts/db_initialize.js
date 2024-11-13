require('dotenv').config({ path: './.env' });

const fs = require('fs');
const mysql = require('mysql2');

// Paramètres de connexion à la base de données
const connection = mysql.createConnection({
  host: process.env.BDD_HOST,
  user: process.env.BDD_USER,
  password: process.env.BDD_PASSWORD,
  database: process.env.BDD_NAME,
  multipleStatements: true,
});

// Lecture du script SQL depuis le fichier
const sqlScriptPath = './server/scripts/database_init.sql';
const sqlScript = fs.readFileSync(sqlScriptPath, 'utf8');

// Connexion à la base de données
connection.connect((err) => {
  if (err) {
    console.error('Erreur de connexion à la base de données :', err);
    return;
  }

  // Execution du script SQL depuis le fichier
  connection.query(sqlScript, (error, results, fields) => {
    if (error) {
      console.error("Erreur lors de l'exécution du script SQL :", error);
    } else {
      console.log('Script SQL exécuté avec succès.');
    }

    // Fermeture de la connexion
    connection.end();
  });
});
