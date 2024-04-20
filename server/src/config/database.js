const { Sequelize, DataTypes } = require('sequelize');

const AnimalModel = require('../models/animal');
const BiomeModel = require('../models/biome');
const FeedingModel = require('../models/feeding');
const ImageModel = require('../models/image');
const MessageModel = require('../models/message');
const ReportModel = require('../models/report');
const ReviewModel = require('../models/review');
const ScheduleModel = require('../models/schedule');
const ServiceModel = require('../models/service');
const SpecieModel = require('../models/specie');
const UserModel = require('../models/user');

// Database connection
const sequelize = new Sequelize(
  process.env.BDD_NAME,
  process.env.BDD_USER,
  process.env.BDD_PASSWORD,
  {
    host: process.env.BDD_HOST,
    dialect: 'mysql',
    dialectOptions: {
      timezone: 'local',
    },
  }
);

// Models definition
const Animal = AnimalModel(sequelize, DataTypes);
const Biome = BiomeModel(sequelize, DataTypes);
const Feeding = FeedingModel(sequelize, DataTypes);
const Image = ImageModel(sequelize, DataTypes);
const Message = MessageModel(sequelize, DataTypes);
const Report = ReportModel(sequelize, DataTypes);
const Review = ReviewModel(sequelize, DataTypes);
const Schedule = ScheduleModel(sequelize, DataTypes);
const Service = ServiceModel(sequelize, DataTypes);
const Specie = SpecieModel(sequelize, DataTypes);
const User = UserModel(sequelize, DataTypes);

module.exports = {
  sequelize,
  Animal,
  Biome,
  Feeding,
  Image,
  Message,
  Report,
  Review,
  Schedule,
  Service,
  Specie,
  User,
};
