import {MigrationInterface, QueryRunner} from "typeorm";

export class addSeeds1609246906060 implements MigrationInterface {
    name = 'addSeeds1609246906060'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `Player` (`id` int NOT NULL AUTO_INCREMENT, `nick` varchar(255) NOT NULL, `cash` int NOT NULL DEFAULT '1500', `position` int NOT NULL DEFAULT '0', `userId` int NOT NULL, `sessionId` int NOT NULL, `isParked` tinyint NOT NULL DEFAULT 0, `isPrisoned` tinyint NOT NULL DEFAULT 0, `createdAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `user` (`id` int NOT NULL AUTO_INCREMENT, `password` varchar(64) NOT NULL, `email` varchar(60) NOT NULL, `nick` varchar(30) NOT NULL, `playerId` int NULL, UNIQUE INDEX `unique_email` (`email`), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `session` (`id` int NOT NULL AUTO_INCREMENT, `pid` varchar(6) NOT NULL, `name` varchar(30) NOT NULL, `isActive` tinyint(1) NOT NULL DEFAULT 0, `createdAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), UNIQUE INDEX `unique_external_id` (`pid`), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `Group` (`id` int NOT NULL AUTO_INCREMENT, `type` enum ('start', 'prison', 'parking', 'toPrison', 'game', 'diceRoll', 'collection', 'chance') NOT NULL DEFAULT 'game', `color` varchar(255) NOT NULL, `createdAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `cardsId` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `Chaining` (`id` int NOT NULL AUTO_INCREMENT, `cardId` int NOT NULL, `groupId` int NOT NULL, `sort` int NOT NULL DEFAULT '10', `createdAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `Card` (`id` int NOT NULL AUTO_INCREMENT, `position` int NOT NULL, `sessionId` int NULL, `playerId` int NULL, `rawPrice` int NOT NULL, `deposit` int NOT NULL, `housePrice` int NOT NULL, `skyscraperPrice` int NOT NULL, `rawFee` int NOT NULL, `oneHouseFee` int NOT NULL, `twoHouseFee` int NOT NULL, `threeHouseFee` int NOT NULL, `fourHouseFee` int NOT NULL, `skyscraperFee` int NOT NULL, `status` enum ('sold', 'deposit', 'active', 'oneBuilding', 'twoBuildings', 'threeBuildings', 'fourBuildings', 'skyscraperBuildings') NOT NULL DEFAULT 'active', `chanceAction` enum ('some action') NULL, `chainingId` int NOT NULL, `createdAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `groupId` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `Binding` (`id` int NOT NULL AUTO_INCREMENT, `playerId` int NOT NULL, `cardId` int NOT NULL, `createdAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `Player` ADD CONSTRAINT `FK_a043880870101ea78e7e12eaecc` FOREIGN KEY (`sessionId`) REFERENCES `session`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `Group` ADD CONSTRAINT `FK_86720493e26a5bf99415d837828` FOREIGN KEY (`cardsId`) REFERENCES `Card`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `Chaining` ADD CONSTRAINT `FK_b3e6582acedb314326bf18a497b` FOREIGN KEY (`cardId`) REFERENCES `Card`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `Chaining` ADD CONSTRAINT `FK_bfa5da3736532b2bdff48cc1170` FOREIGN KEY (`groupId`) REFERENCES `Group`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `Card` ADD CONSTRAINT `FK_58d49366985a40388d1bb58d916` FOREIGN KEY (`sessionId`) REFERENCES `session`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `Card` ADD CONSTRAINT `FK_9537162fcfd46e9ae186b5487ea` FOREIGN KEY (`playerId`) REFERENCES `Player`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `Card` ADD CONSTRAINT `FK_d64d44bfac9b4b2a10747ce9265` FOREIGN KEY (`groupId`) REFERENCES `Group`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `Binding` ADD CONSTRAINT `FK_bddcf77f94607ced112326dd91c` FOREIGN KEY (`playerId`) REFERENCES `Player`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `Binding` DROP FOREIGN KEY `FK_bddcf77f94607ced112326dd91c`");
        await queryRunner.query("ALTER TABLE `Card` DROP FOREIGN KEY `FK_d64d44bfac9b4b2a10747ce9265`");
        await queryRunner.query("ALTER TABLE `Card` DROP FOREIGN KEY `FK_9537162fcfd46e9ae186b5487ea`");
        await queryRunner.query("ALTER TABLE `Card` DROP FOREIGN KEY `FK_58d49366985a40388d1bb58d916`");
        await queryRunner.query("ALTER TABLE `Chaining` DROP FOREIGN KEY `FK_bfa5da3736532b2bdff48cc1170`");
        await queryRunner.query("ALTER TABLE `Chaining` DROP FOREIGN KEY `FK_b3e6582acedb314326bf18a497b`");
        await queryRunner.query("ALTER TABLE `Group` DROP FOREIGN KEY `FK_86720493e26a5bf99415d837828`");
        await queryRunner.query("ALTER TABLE `Player` DROP FOREIGN KEY `FK_a043880870101ea78e7e12eaecc`");
        await queryRunner.query("DROP TABLE `Binding`");
        await queryRunner.query("DROP TABLE `Card`");
        await queryRunner.query("DROP TABLE `Chaining`");
        await queryRunner.query("DROP TABLE `Group`");
        await queryRunner.query("DROP INDEX `unique_external_id` ON `session`");
        await queryRunner.query("DROP TABLE `session`");
        await queryRunner.query("DROP INDEX `unique_email` ON `user`");
        await queryRunner.query("DROP TABLE `user`");
        await queryRunner.query("DROP TABLE `Player`");
    }

}
