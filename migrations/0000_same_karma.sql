CREATE TABLE `links` (
	`id` integer PRIMARY KEY NOT NULL,
	`url` text NOT NULL,
	`created` text DEFAULT (current_timestamp),
	`updated` text DEFAULT (current_timestamp)
);
