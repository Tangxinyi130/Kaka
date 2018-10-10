-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema kaka
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema kaka
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `kaka` ;
USE `kaka` ;

-- -----------------------------------------------------
-- Table `kaka`.`userinfo`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `kaka`.`userinfo` (
  `userId` INT NOT NULL AUTO_INCREMENT,
  `userName` VARCHAR(20) NULL,
  `userPwd` CHAR(32) NULL,
  `userTime` DATETIME NULL,
  `userTel` CHAR(11) NULL,
  `userNickname` VARCHAR(32) NULL,
  `userSex` CHAR(3) NULL,
  `userEmail` VARCHAR(50) NULL,
  `userHeadPic` VARCHAR(100) NULL,
  `userBirthday` DATE NULL,
  `userProvince` VARCHAR(30) NULL,
  `userCity` VARCHAR(30) NULL,
  `userPostcode` CHAR(6) NULL,
  `userAddress` VARCHAR(255) NULL,
  `userAboutMe` VARCHAR(100) NULL,
  PRIMARY KEY (`userId`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `kaka`.`postcard`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `kaka`.`postcard` (
  `cardId` VARCHAR(20) NOT NULL,
  `cardSender` INT NOT NULL,
  `cardReceiver` INT NOT NULL,
  `cardSendRegion` VARCHAR(60) NULL,
  `cardReceiveRegion` VARCHAR(60) NULL,
  `cardSendTime` DATETIME NULL,
  `cardReceiveTime` DATETIME NULL,
  `cardPic` VARCHAR(100) NULL,
  `cardDistance` FLOAT NULL,
  `cardLike` INT NULL,
  PRIMARY KEY (`cardId`),
  INDEX `fk_postcard_userinfo_idx` (`cardSender` ASC) VISIBLE,
  INDEX `fk_postcard_userinfo1_idx` (`cardReceiver` ASC) VISIBLE,
  CONSTRAINT `cardSender`
    FOREIGN KEY (`cardSender`)
    REFERENCES `kaka`.`userinfo` (`userId`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `cardReceiver`
    FOREIGN KEY (`cardReceiver`)
    REFERENCES `kaka`.`userinfo` (`userId`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `kaka`.`region`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `kaka`.`region` (
  `regionId` VARCHAR(3) NOT NULL,
  `regionName` VARCHAR(30) NULL,
  `regionNum` INT NULL,
  PRIMARY KEY (`regionId`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `kaka`.`attention`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `kaka`.`attention` (
  `attentionId` INT NOT NULL AUTO_INCREMENT,
  `attentionFan` INT NOT NULL,
  `attentionName` INT NOT NULL,
  INDEX `fk_userinfo_has_userinfo_userinfo2_idx` (`attentionName` ASC) VISIBLE,
  INDEX `fk_userinfo_has_userinfo_userinfo1_idx` (`attentionFan` ASC) VISIBLE,
  PRIMARY KEY (`attentionId`),
  CONSTRAINT `attentionFan`
    FOREIGN KEY (`attentionFan`)
    REFERENCES `kaka`.`userinfo` (`userId`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `attentionName`
    FOREIGN KEY (`attentionName`)
    REFERENCES `kaka`.`userinfo` (`userId`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `kaka`.`pool`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `kaka`.`pool` (
  `poolId` INT NOT NULL AUTO_INCREMENT,
  `poolUserId` INT NOT NULL,
  `poolTime` DATETIME NOT NULL,
  PRIMARY KEY (`poolId`),
  INDEX `fk_pool_userinfo1_idx` (`poolUserId` ASC) VISIBLE,
  CONSTRAINT `poolUserId`
    FOREIGN KEY (`poolUserId`)
    REFERENCES `kaka`.`userinfo` (`userId`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `kaka`.`comment`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `kaka`.`comment` (
  `commentId` INT NOT NULL AUTO_INCREMENT,
  `commentCardId` VARCHAR(20) NOT NULL,
  `commentUserId` INT NOT NULL,
  `commentTime` DATETIME NULL,
  `commentContent` VARCHAR(100) NULL,
  PRIMARY KEY (`commentId`),
  INDEX `commentCardId_idx` (`commentCardId` ASC) VISIBLE,
  INDEX `commentUserId_idx` (`commentUserId` ASC) VISIBLE,
  CONSTRAINT `commentCardId`
    FOREIGN KEY (`commentCardId`)
    REFERENCES `kaka`.`postcard` (`cardId`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `commentUserId`
    FOREIGN KEY (`commentUserId`)
    REFERENCES `kaka`.`userinfo` (`userId`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `kaka`.`activity`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `kaka`.`activity` (
  `activityId` INT NOT NULL AUTO_INCREMENT,
  `activityName` VARCHAR(30) NULL,
  `activityStartDate` DATETIME NULL,
  `activityEndDate` DATETIME NULL,
  `activityType` VARCHAR(20) NULL,
  `activityDetails` TEXT NULL,
  PRIMARY KEY (`activityId`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `kaka`.`goods`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `kaka`.`goods` (
  `goodsId` INT NOT NULL AUTO_INCREMENT,
  `goodsActivityId` INT NOT NULL,
  `goodsName` VARCHAR(30) NULL,
  `goodsNum` INT NULL,
  `goodsPrice` FLOAT NULL,
  `goodsPic` VARCHAR(100) NULL,
  `goodsDetails` VARCHAR(255) NULL,
  PRIMARY KEY (`goodsId`),
  INDEX `goodsActivityId_idx` (`goodsActivityId` ASC) VISIBLE,
  CONSTRAINT `goodsActivityId`
    FOREIGN KEY (`goodsActivityId`)
    REFERENCES `kaka`.`activity` (`activityId`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `kaka`.`myactivity`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `kaka`.`myactivity` (
  `myactivityId` INT NOT NULL AUTO_INCREMENT,
  `myactivityUserId` INT NOT NULL,
  `myactivityActivityId` INT NOT NULL,
  PRIMARY KEY (`myactivityId`),
  INDEX `myactivityUserId_idx` (`myactivityUserId` ASC) VISIBLE,
  INDEX `myactivityActivityId_idx` (`myactivityActivityId` ASC) VISIBLE,
  CONSTRAINT `myactivityUserId`
    FOREIGN KEY (`myactivityUserId`)
    REFERENCES `kaka`.`userinfo` (`userId`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `myactivityActivityId`
    FOREIGN KEY (`myactivityActivityId`)
    REFERENCES `kaka`.`activity` (`activityId`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `kaka`.`mygoods`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `kaka`.`mygoods` (
  `mygoodsId` INT NOT NULL AUTO_INCREMENT,
  `mygoodsUserId` INT NOT NULL,
  `mygoodsGoodsId` INT NOT NULL,
  `mygoodsIsReceived` BIT NULL,
  `mygoodsDate` DATETIME NULL,
  `mygoodsAddress` VARCHAR(255) NULL,
  PRIMARY KEY (`mygoodsId`),
  INDEX `mygoodsUserId_idx` (`mygoodsUserId` ASC) VISIBLE,
  INDEX `mygoodsGoodsId_idx` (`mygoodsGoodsId` ASC) VISIBLE,
  CONSTRAINT `mygoodsGoodsId`
    FOREIGN KEY (`mygoodsGoodsId`)
    REFERENCES `kaka`.`goods` (`goodsId`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `mygoodsUserId`
    FOREIGN KEY (`mygoodsUserId`)
    REFERENCES `kaka`.`userinfo` (`userId`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `kaka`.`collection`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `kaka`.`collection` (
  `collectionId` INT NOT NULL AUTO_INCREMENT,
  `collectionUserId` INT NOT NULL,
  `collectionCardId` VARCHAR(20) NOT NULL,
  PRIMARY KEY (`collectionId`),
  INDEX `collectionUserId_idx` (`collectionUserId` ASC) VISIBLE,
  INDEX `collectionCardId_idx` (`collectionCardId` ASC) VISIBLE,
  CONSTRAINT `collectionUserId`
    FOREIGN KEY (`collectionUserId`)
    REFERENCES `kaka`.`userinfo` (`userId`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `collectionCardId`
    FOREIGN KEY (`collectionCardId`)
    REFERENCES `kaka`.`postcard` (`cardId`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `kaka`.`manager`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `kaka`.`manager` (
  `managerId` CHAR(5) NOT NULL,
  `managerPwd` CHAR(32) NOT NULL,
  PRIMARY KEY (`managerId`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `kaka`.`shippingAddress`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `kaka`.`shippingAddress` (
  `shippingAddressId` INT NOT NULL AUTO_INCREMENT,
  `shippingAddressUserId` INT NOT NULL,
  `address` VARCHAR(255) NULL,
  PRIMARY KEY (`shippingAddressId`),
  INDEX `shippingAddressUserId_idx` (`shippingAddressUserId` ASC) VISIBLE,
  CONSTRAINT `shippingAddressUserId`
    FOREIGN KEY (`shippingAddressUserId`)
    REFERENCES `kaka`.`userinfo` (`userId`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
