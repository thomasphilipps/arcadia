require('dotenv').config({ path: './.env' });

const mysql = require('mysql2');
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');
const prompt = require('prompt-sync')();

// Fonction pour valider l'email
function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Fonction pour valider le nom
function validateName(name) {
  const namePattern =
    /^(?![ '-]+$)[a-zA-ZàâäéèêëîïôöùûüçÀÂÄÉÈÊËÎÏÔÖÙÛÜÇ]{2}[a-zA-ZàâäéèêëîïôöùûüçÀÂÄÉÈÊËÎÏÔÖÙÛÜÇ\- ']*$/;
  return namePattern.test(name);
}

// Fonction pour valider le mot de passe
function validatePassword(password) {
  let conditionsMet = 0;
  const hasLowerCase = /[a-z]/.test(password);
  const hasUpperCase = /[A-Z]/.test(password);
  const hasNumber = /\d/.test(password);
  const hasSpecialChar = /\W/.test(password);

  if (hasLowerCase) conditionsMet++;
  if (hasUpperCase) conditionsMet++;
  if (hasNumber) conditionsMet++;
  if (hasSpecialChar) conditionsMet++;

  const isValid = conditionsMet >= 3 && password.length >= 12;
  return isValid;
}

// Demande des informations utilisateur avec validation
let userEmail;
do {
  userEmail = prompt("Entrez l'email de l'utilisateur : ");
  if (!validateEmail(userEmail)) {
    console.log('Veuillez entrer un email valide.');
  }
} while (!validateEmail(userEmail));

let userName;
do {
  userName = prompt("Entrez le nom de l'utilisateur (Nom Prénom) : ");
  if (!validateName(userName)) {
    console.log('Veuillez entrer un nom valide (Nom Prénom ou Nom Prénom Prénom).');
  }
} while (!validateName(userName));

let userPassword;
do {
  userPassword = prompt("Entrez le mot de passe de l'utilisateur : ");
  if (!validatePassword(userPassword)) {
    console.log(
      'Le mot de passe doit comporter au moins 12 caractères et contenir au moins trois des éléments suivants : minuscules, majuscules, chiffres, caractères spéciaux.'
    );
  }
} while (!validatePassword(userPassword));

// Fonction pour hacher le mot de passe
async function hashPassword(password) {
  return bcrypt.hash(password, 10);
}

// Créez une connexion à la base de données MySQL
const connection = mysql.createConnection({
  host: process.env.BDD_HOST,
  user: process.env.BDD_USER,
  password: process.env.BDD_PASSWORD,
  database: process.env.BDD_NAME,
  multipleStatements: true,
});

// Établissez la connexion à la base de données
connection.connect(async (err) => {
  if (err) {
    console.error('Erreur de connexion à la base de données :', err);
    return;
  }

  try {
    // Générez un UUID pour l'utilisateur
    const userId = uuidv4();

    // Hachez le mot de passe
    const hashedPassword = await hashPassword(userPassword);

    // Préparez la requête SQL pour insérer l'utilisateur
    const insertUserQuery = `
      INSERT INTO Users (userId, userEmail, userName, userPassword, userRole)
      VALUES (?, ?, ?, ?, 'ROLE_ADMIN');
    `;

    // Exécutez la requête SQL pour insérer l'utilisateur
    connection.query(
      insertUserQuery,
      [userId, userEmail, userName, hashedPassword],
      (insertError, insertResults) => {
        if (insertError) {
          console.error("Erreur lors de l'insertion de l'utilisateur :", insertError);
        } else {
          console.log('Utilisateur ajouté avec succès.');
        }

        // Fermez la connexion à la base de données
        connection.end();
      }
    );
  } catch (error) {
    console.error("Erreur lors de la création de l'utilisateur :", error);
    connection.end();
  }
});
