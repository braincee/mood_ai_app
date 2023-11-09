CREATE TABLE `analysis` (
	`id` int AUTO_INCREMENT NOT NULL,
	`user_id` int NOT NULL,
	`entry_id` int NOT NULL,
	`mood` varchar(225),
	`summary` text,
	`color` varchar(225),
	`negative` boolean,
	`subject` varchar(225),
	`sentimentScore` float DEFAULT 0,
	`created_at` datetime,
	`updated_at` datetime,
	CONSTRAINT `analysis_id` PRIMARY KEY(`id`),
	CONSTRAINT `entry_id` UNIQUE(`entry_id`)
);
--> statement-breakpoint
CREATE TABLE `journal_entries` (
	`id` int AUTO_INCREMENT NOT NULL,
	`user_id` int NOT NULL,
	`content` text NOT NULL,
	`created_at` datetime,
	`updated_at` datetime,
	CONSTRAINT `journal_entries_id` PRIMARY KEY(`id`),
	CONSTRAINT `id` UNIQUE(`id`),
	CONSTRAINT `user_id` UNIQUE(`user_id`)
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` int AUTO_INCREMENT NOT NULL,
	`clerk_id` varchar(225) NOT NULL,
	`email` varchar(225) NOT NULL,
	`created_at` datetime,
	`updated_at` datetime,
	CONSTRAINT `users_id` PRIMARY KEY(`id`),
	CONSTRAINT `clerk_id` UNIQUE(`clerk_id`),
	CONSTRAINT `email` UNIQUE(`email`)
);
--> statement-breakpoint
CREATE INDEX `user_id_idx` ON `analysis` (`user_id`);--> statement-breakpoint
CREATE INDEX `entry_id_idx` ON `analysis` (`entry_id`);--> statement-breakpoint
CREATE INDEX `user_id_idx` ON `journal_entries` (`user_id`);