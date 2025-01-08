ALTER TABLE `transactions` RENAME COLUMN "value" TO "amount";--> statement-breakpoint
ALTER TABLE `transactions` ADD `description` text NOT NULL;