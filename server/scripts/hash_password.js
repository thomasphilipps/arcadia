const bcrypt = require('bcrypt');
const readlineSync = require('readline-sync');

const password = readlineSync.question('Enter your password: ', {
  hideEchoBack: true, // Masquer l'entrée du mot de passe pour plus de sécurité
});

const saltRounds = 10;

// Crypter le mot de passe
bcrypt.hash(password, saltRounds, function (err, hash) {
  if (err) {
    console.error('Error encrypting password:', err);
  } else {
    console.log('Encrypted password:', hash);
  }
});
