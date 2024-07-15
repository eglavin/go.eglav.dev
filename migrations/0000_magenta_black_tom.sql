CREATE TABLE `links` (
	`id` integer PRIMARY KEY NOT NULL,
	`url` text NOT NULL,
	`timestamp` text DEFAULT (current_timestamp)
);
