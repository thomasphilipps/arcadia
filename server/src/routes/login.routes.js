const { sequelize } = require('../config/database');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const privateKey = process.env.AUTH_PRIVATE_KEY;

module.exports = (app) => {
  app.post('/api/login', async (req, res) => {
    const userEmail = req.body.userEmail;
    const userPassword = req.body.userPassword;
    try {
      const userResult = await sequelize.query('SELECT * FROM `Users` WHERE `userEmail` = ?', {
        replacements: [userEmail],
        type: sequelize.QueryTypes.SELECT,
      });

      const user = userResult[0];

      if (!user) {
        return res.status(401).json({ message: 'Utilisateur introuvable' });
      }

      const validPassword = await bcrypt.compare(userPassword, user.userPassword);

      if (!validPassword) {
        return res.status(401).json({ message: 'Mot de passe erroné' });
      }

      const token = jwt.sign({ userId: user.userId, userRole: user.userRole }, privateKey, {
        expiresIn: '24h',
      });

      res.status(200).json({
        userId: user.userId,
        userEmail: user.userEmail,
        userName: user.userName,
        userRole: user.userRole,
        userToken: token,
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
};
