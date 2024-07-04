CREATE TABLE IF NOT EXISTS
  Users (
    userId VARCHAR(36) PRIMARY KEY,
    userEmail VARCHAR(255) NOT NULL UNIQUE,
    userName VARCHAR(32) NOT NULL,
    userPassword VARCHAR(60) NOT NULL,
    userRole ENUM('ROLE_ADMIN', 'ROLE_EMPLOYEE', 'ROLE_VETERINARY') NOT NULL DEFAULT 'ROLE_EMPLOYEE'
  );

CREATE TABLE IF NOT EXISTS
  Biomes (
    biomeId INT AUTO_INCREMENT PRIMARY KEY,
    biomeName VARCHAR(32) NOT NULL UNIQUE,
    biomeShortDescr VARCHAR(255) NOT NULL,
    biomeLongDescr TEXT NOT NULL,
    biomeStatus TEXT
  );

CREATE TABLE IF NOT EXISTS
  Species (
    specieId INT AUTO_INCREMENT PRIMARY KEY,
    specieName VARCHAR(32) NOT NULL UNIQUE,
    specieTaxon VARCHAR(32) NOT NULL,
    specieDescr TEXT NOT NULL,
    biomeKey INT,
    FOREIGN KEY (biomeKey) REFERENCES Biomes (biomeId)
  );

CREATE TABLE IF NOT EXISTS
  Animals (
    animalId VARCHAR(36) PRIMARY KEY,
    animalName VARCHAR(32) NOT NULL,
    animalDescr TEXT NOT NULL,
    animalBirth TIMESTAMP NOT NULL,
    animalGender ENUM('Mâle', 'Femelle') NOT NULL,
    biomeKey INT,
    specieKey INT,
    FOREIGN KEY (biomeKey) REFERENCES Biomes (biomeId),
    FOREIGN KEY (specieKey) REFERENCES Species (specieId)
  );

CREATE TABLE IF NOT EXISTS
  Services (
    serviceId INT AUTO_INCREMENT PRIMARY KEY,
    serviceName VARCHAR(32) NOT NULL UNIQUE,
    serviceShortDescr VARCHAR(255) NOT NULL,
    serviceLongDescr TEXT NOT NULL
  );

CREATE TABLE IF NOT EXISTS
  Schedules (
    dayId INT AUTO_INCREMENT PRIMARY KEY,
    dayName VARCHAR(32) NOT NULL,
    openAm TIME,
    closeAm TIME,
    openPm TIME,
    closePm TIME
  );

CREATE TABLE IF NOT EXISTS
  Reviews (
    reviewId INT AUTO_INCREMENT PRIMARY KEY,
    reviewAlias VARCHAR(32) NOT NULL,
    reviewContent TEXT NOT NULL,
    reviewRating INT NOT NULL,
    reviewPostedOn TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    reviewApproved TINYINT(1) NOT NULL DEFAULT 0,
    reviewApprovedBy VARCHAR(36),
    FOREIGN KEY (reviewApprovedBy) REFERENCES Users (userId) ON DELETE SET NULL
  );

CREATE TABLE IF NOT EXISTS
  Reports (
    reportId INT AUTO_INCREMENT PRIMARY KEY,
    reportState TEXT NOT NULL,
    reportDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    reportDetails TEXT,
    reportFoodType VARCHAR(32),
    reportFoodAmount VARCHAR(32),
    animalKey VARCHAR(36),
    veterinaryKey VARCHAR(36), -- Veterinary who wrote the report
    FOREIGN KEY (animalKey) REFERENCES Animals (animalId),
    FOREIGN KEY (veterinaryKey) REFERENCES Users (userId)
  );

CREATE TABLE IF NOT EXISTS
  Feedings (
    feedingId INT AUTO_INCREMENT PRIMARY KEY,
    feedingType VARCHAR(32) NOT NULL,
    feedingAmount VARCHAR(32) NOT NULL,
    feedingDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    feedingBy VARCHAR(36),
    reportKey INT,
    animalKey VARCHAR(36),
    FOREIGN KEY (animalKey) REFERENCES Animals (animalId),
    FOREIGN KEY (reportKey) REFERENCES Reports (reportId),
    FOREIGN KEY (feedingBy) REFERENCES Users (userId)
  );

CREATE TABLE IF NOT EXISTS
  Images (
    imageId CHAR(36) PRIMARY KEY,
    imagePath VARCHAR(255) NOT NULL,
    imageDescription TEXT,
    referenceId VARCHAR(36) NOT NULL,
    referenceType ENUM('Animal', 'Biome', 'Service', 'Specie') NOT NULL
  );

-- Trigger to prevent multiple admins
DROP TRIGGER IF EXISTS PreventMultipleAdmins;
CREATE TRIGGER PreventMultipleAdmins BEFORE INSERT ON Users
FOR EACH ROW
BEGIN
  DECLARE admin_count INT DEFAULT 0;
  IF NEW.userRole = 'ROLE_ADMIN' THEN
    SELECT COUNT(*) INTO admin_count FROM Users WHERE userRole = 'ROLE_ADMIN';
    IF admin_count >= 1 THEN
      SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Impossible de créer un autre administrateur';
    END IF;
  END IF;
END;

-- Trigger to prevent deletion of admin users
DROP TRIGGER IF EXISTS PreventAdminDeletion;
CREATE TRIGGER PreventAdminDeletion BEFORE DELETE ON Users
FOR EACH ROW
BEGIN
    IF OLD.userRole = 'ROLE_ADMIN' THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Impossible de supprimer un administrateur';
    END IF;
END;

-- Trigger to handle deletions from the Animals table
DROP TRIGGER IF EXISTS AfterAnimalDelete;
CREATE TRIGGER AfterAnimalDelete AFTER DELETE ON Animals
FOR EACH ROW
BEGIN
  DELETE FROM Images WHERE referenceId = OLD.animalId AND referenceType = 'Animal';
  DELETE FROM Reports WHERE animalKey = OLD.animalId;
  DELETE FROM Feedings WHERE animalKey = OLD.animalId;
END;

-- Trigger to handle deletions from the Biomes table
DROP TRIGGER IF EXISTS AfterBiomeDelete;
CREATE TRIGGER AfterBiomeDelete AFTER DELETE ON Biomes
FOR EACH ROW
BEGIN
  DELETE FROM Images WHERE referenceId = OLD.biomeId AND referenceType = 'Biome';
END;

-- Trigger to handle deletions from the Services table
DROP TRIGGER IF EXISTS AfterServiceDelete;
CREATE TRIGGER AfterServiceDelete AFTER DELETE ON Services
FOR EACH ROW
BEGIN
  DELETE FROM Images WHERE referenceId = OLD.serviceId AND referenceType = 'Service';
END;

-- Trigger to handle deletions from the Species table
DROP TRIGGER IF EXISTS AfterSpecieDelete;
CREATE TRIGGER AfterSpecieDelete AFTER DELETE ON Species
FOR EACH ROW
BEGIN
  DELETE FROM Images WHERE referenceId = OLD.specieId AND referenceType = 'Specie';
END;

-- Inital data
INSERT INTO
  Schedules (`dayName`)
VALUES
  ('Lundi'),
  ('Mardi'),
  ('Mercredi'),
  ('Jeudi'),
  ('Vendredi'),
  ('Samedi'),
  ('Dimanche');