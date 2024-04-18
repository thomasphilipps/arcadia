CREATE TABLE IF NOT EXISTS Users (
    userId VARCHAR(36) PRIMARY KEY,
    userEmail VARCHAR(255) NOT NULL UNIQUE,
    userName VARCHAR(32) NOT NULL,
    userPassword VARCHAR(60) NOT NULL,
    userRole ENUM ('ROLE_ADMIN', 'ROLE_EMPLOYEE', 'ROLE_VETERINARY') NOT NULL DEFAULT 'ROLE_EMPLOYEE'
);

CREATE TABLE IF NOT EXISTS Biomes (
    biomeId INT AUTO_INCREMENT PRIMARY KEY,
    biomeName VARCHAR(32) NOT NULL UNIQUE,
    biomeShortDescr VARCHAR(255) NOT NULL,
    biomeLongDescr TEXT NOT NULL,
    biomeStatus TEXT
);

CREATE TABLE IF NOT EXISTS Species (
    specieId INT AUTO_INCREMENT PRIMARY KEY,
    specieName VARCHAR(32) NOT NULL UNIQUE,
    specieDescr TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS Animals (
    animalId VARCHAR(36) PRIMARY KEY,
    animalName VARCHAR(32) NOT NULL,
    animalBirth TIMESTAMP NOT NULL,
    biomeKey INT,
    specieKey INT,
    FOREIGN KEY (biomeKey) REFERENCES Biomes(biomeId),
    FOREIGN KEY (specieKey) REFERENCES Species(specieId)
);

CREATE TABLE IF NOT EXISTS Services (
    serviceId INT AUTO_INCREMENT PRIMARY KEY,
    serviceName VARCHAR(32) NOT NULL UNIQUE,
    serviceShortDescr VARCHAR(255) NOT NULL,
    serviceLongDescr TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS Schedules (
    dayId INT AUTO_INCREMENT PRIMARY KEY,
    dayName VARCHAR(32) NOT NULL,
    openAm TIME,
    closeAm TIME,
    openPm TIME,
    closePm TIME
);

CREATE TABLE IF NOT EXISTS Reviews (
    reviewId INT AUTO_INCREMENT PRIMARY KEY,
    reviewAlias VARCHAR(32) NOT NULL,
    reviewContent TEXT NOT NULL,
    reviewRating INT NOT NULL,
    reviewPostedOn TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    reviewApproved TINYINT(1) NOT NULL DEFAULT 0,
    reviewApprovedBy VARCHAR(36),
    FOREIGN KEY (reviewApprovedBy) REFERENCES Users(userId) ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS Messages (
    messageId INT AUTO_INCREMENT PRIMARY KEY,
    messageTitle VARCHAR(32) NOT NULL,
    messageContent TEXT NOT NULL,
    messageEmail VARCHAR(255) NOT NULL,
    messageDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    messageProcessed TINYINT(1) NOT NULL DEFAULT 0,
    messageProcessedBy VARCHAR(36),
    messageProcessedOn TIMESTAMP,
    FOREIGN KEY (messageProcessedBy) REFERENCES Users(userId) ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS Reports (
    reportId INT AUTO_INCREMENT PRIMARY KEY,
    reportState TEXT NOT NULL,
    reportDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    reportDetails TEXT,
    reportFoodType VARCHAR(32),
    reportFoodAmount VARCHAR(32),
    animalKey VARCHAR(36),
    FOREIGN KEY (animalKey) REFERENCES Animals(animalId)
);

CREATE TABLE IF NOT EXISTS Feedings (
    feedingId INT AUTO_INCREMENT PRIMARY KEY,
    feedingType VARCHAR(32) NOT NULL,
    feedingAmount VARCHAR(32) NOT NULL,
    feedingDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    animalKey VARCHAR(36),
    FOREIGN KEY (animalKey) REFERENCES Animals(animalId)
);

CREATE TABLE IF NOT EXISTS Images (
    imageId CHAR(36) PRIMARY KEY,
    imagePath VARCHAR(255) NOT NULL,
    imageDescription TEXT,
    referenceId VARCHAR(36) NOT NULL,
    referenceType ENUM('Animal', 'Biome', 'Service') NOT NULL
);

DELIMITER //

CREATE TRIGGER PreventMultipleAdmins
BEFORE INSERT ON Users
FOR EACH ROW
BEGIN
  DECLARE admin_count INT DEFAULT 0;
  IF NEW.userRole = 'ROLE_ADMIN' THEN
    SELECT COUNT(*) INTO admin_count FROM Users WHERE userRole = 'ROLE_ADMIN';
    IF admin_count >= 1 THEN
      SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Cannot add more than one admin.';
    END IF;
  END IF;
END//

CREATE TRIGGER AfterAnimalDelete
AFTER DELETE ON Animals
FOR EACH ROW
BEGIN
  DELETE FROM Images WHERE referenceId = OLD.animalId AND referenceType = 'Animal';
  DELETE FROM Reports WHERE animalKey = OLD.animalId;
  DELETE FROM Feedings WHERE animalKey = OLD.animalId;
END//

CREATE TRIGGER AfterBiomeDelete
AFTER DELETE ON Biomes
FOR EACH ROW
BEGIN
  DELETE FROM Images WHERE referenceId = OLD.biomeId AND referenceType = 'Biome';
END//

CREATE TRIGGER AfterServiceDelete
AFTER DELETE ON Services
FOR EACH ROW
BEGIN
  DELETE FROM Images WHERE referenceId = OLD.serviceId AND referenceType = 'Service';
END//

DELIMITER ;
