CREATE TABLE `customer_user` (
	`id` char(9) NOT NULL,
	`email` varchar(255) NOT NULL,
	`name` varchar(255) NOT NULL,
	`phone_number` char(10) NOT NULL,
	`address` varchar(255) NOT NULL,
	`pin_code` char(6) NOT NULL,
	`created_at` timestamp(6) NOT NULL,
	`updated_at` timestamp(6) NOT NULL,
	`table_identifier_token` enum('SCIT','VUSE','CUSE','SPIN','SCLP','STAT','DIST','PAYM','VSCI') NOT NULL DEFAULT 'CUSE',
	CONSTRAINT `customer_user_id` PRIMARY KEY(`id`),
	CONSTRAINT `customer_user_email_unique` UNIQUE(`email`)
);
--> statement-breakpoint
CREATE TABLE `district` (
	`id` varchar(255) NOT NULL,
	`district_name` varchar(255) NOT NULL,
	`associated_state` varchar(255) NOT NULL,
	`created_at` timestamp(6) NOT NULL,
	`updated_at` timestamp(6) NOT NULL,
	`table_identifier_token` enum('SCIT','VUSE','CUSE','SPIN','SCLP','STAT','DIST','PAYM','VSCI') NOT NULL DEFAULT 'DIST',
	CONSTRAINT `district_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `payment` (
	`id` char(9) NOT NULL,
	`vendor_id` char(9) NOT NULL,
	`scrap_order_id` char(9) NOT NULL,
	`razorpay_order_id` varchar(255) NOT NULL,
	`razorpay_payment_id` varchar(255),
	`razorpay_signature` varchar(255),
	`created_at` timestamp(6) NOT NULL,
	`updated_at` timestamp(6) NOT NULL,
	`table_identifier_token` enum('SCIT','VUSE','CUSE','SPIN','SCLP','STAT','DIST','PAYM','VSCI') NOT NULL DEFAULT 'PAYM',
	CONSTRAINT `payment_id` PRIMARY KEY(`id`),
	CONSTRAINT `payment_razorpay_order_id_idx` UNIQUE(`razorpay_order_id`)
);
--> statement-breakpoint
CREATE TABLE `scrap_collection_process` (
	`id` char(9) NOT NULL,
	`customer_id` char(9) NOT NULL,
	`vendor_id` char(9),
	`scrap_item_id` char(9) NOT NULL,
	`floor` varchar(50) NOT NULL,
	`landmark` varchar(255) NOT NULL,
	`collection_date_time` datetime NOT NULL,
	`scrap_collection_status` enum('order-placed','payment-processing','order-accepted','process-completed') NOT NULL,
	`created_at` timestamp(6) NOT NULL,
	`updated_at` timestamp(6) NOT NULL,
	`table_identifier_token` enum('SCIT','VUSE','CUSE','SPIN','SCLP','STAT','DIST','PAYM','VSCI') NOT NULL DEFAULT 'SCLP',
	CONSTRAINT `scrap_collection_process_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `scrap_item` (
	`id` char(9) NOT NULL,
	`product_name` varchar(255) NOT NULL,
	`vendor_price` int NOT NULL,
	`customer_price` int NOT NULL,
	`price_unit` enum('piece','kilo') NOT NULL,
	`commision_rate` int NOT NULL,
	`created_at` timestamp(6) NOT NULL,
	`updated_at` timestamp(6) NOT NULL,
	`table_identifier_token` enum('SCIT','VUSE','CUSE','SPIN','SCLP','STAT','DIST','PAYM','VSCI') NOT NULL DEFAULT 'SCIT',
	CONSTRAINT `scrap_item_id` PRIMARY KEY(`id`),
	CONSTRAINT `scrap_item_product_name_unique` UNIQUE(`product_name`)
);
--> statement-breakpoint
CREATE TABLE `serviceable_pincode` (
	`vendor_id` char(9) NOT NULL,
	`pin_code` char(6) NOT NULL,
	`created_at` timestamp(6) NOT NULL,
	`updated_at` timestamp(6) NOT NULL,
	`table_identifier_token` enum('SCIT','VUSE','CUSE','SPIN','SCLP','STAT','DIST','PAYM','VSCI') NOT NULL DEFAULT 'SPIN',
	CONSTRAINT `serviceable_pincode_vendor_id_pin_code_pk` PRIMARY KEY(`vendor_id`,`pin_code`)
);
--> statement-breakpoint
CREATE TABLE `state` (
	`id` varchar(255) NOT NULL,
	`state_name` varchar(255) NOT NULL,
	`created_at` timestamp(6) NOT NULL,
	`updated_at` timestamp(6) NOT NULL,
	`table_identifier_token` enum('SCIT','VUSE','CUSE','SPIN','SCLP','STAT','DIST','PAYM','VSCI') NOT NULL DEFAULT 'STAT',
	CONSTRAINT `state_id` PRIMARY KEY(`id`),
	CONSTRAINT `state_state_name_unique` UNIQUE(`state_name`)
);
--> statement-breakpoint
CREATE TABLE `vendor_scrap_item` (
	`vendor_id` char(9) NOT NULL,
	`scrap_item_id` char(9) NOT NULL,
	`created_at` timestamp(6) NOT NULL,
	`updated_at` timestamp(6) NOT NULL,
	`table_identifier_token` enum('SCIT','VUSE','CUSE','SPIN','SCLP','STAT','DIST','PAYM','VSCI') NOT NULL DEFAULT 'VSCI',
	CONSTRAINT `vendor_scrap_item_vendor_id_scrap_item_id_pk` PRIMARY KEY(`vendor_id`,`scrap_item_id`)
);
--> statement-breakpoint
CREATE TABLE `vendor_user` (
	`id` char(9) NOT NULL,
	`email` varchar(255) NOT NULL,
	`name` varchar(255) NOT NULL,
	`phone_number` char(10) NOT NULL,
	`aadhaar_number` char(12) NOT NULL,
	`address` varchar(255) NOT NULL,
	`city` varchar(255) NOT NULL,
	`district` varchar(255) NOT NULL,
	`state` varchar(255) NOT NULL,
	`pin_code` char(6) NOT NULL,
	`created_at` timestamp(6) NOT NULL,
	`updated_at` timestamp(6) NOT NULL,
	`table_identifier_token` enum('SCIT','VUSE','CUSE','SPIN','SCLP','STAT','DIST','PAYM','VSCI') NOT NULL DEFAULT 'VUSE',
	CONSTRAINT `vendor_user_id` PRIMARY KEY(`id`),
	CONSTRAINT `vendor_user_email_unique` UNIQUE(`email`)
);
--> statement-breakpoint
ALTER TABLE `district` ADD CONSTRAINT `district_associated_state_state_id_fk` FOREIGN KEY (`associated_state`) REFERENCES `state`(`id`) ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `payment` ADD CONSTRAINT `payment_vendor_id_vendor_user_id_fk` FOREIGN KEY (`vendor_id`) REFERENCES `vendor_user`(`id`) ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `payment` ADD CONSTRAINT `payment_scrap_order_id_scrap_collection_process_id_fk` FOREIGN KEY (`scrap_order_id`) REFERENCES `scrap_collection_process`(`id`) ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `scrap_collection_process` ADD CONSTRAINT `scrap_collection_process_customer_id_customer_user_id_fk` FOREIGN KEY (`customer_id`) REFERENCES `customer_user`(`id`) ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `scrap_collection_process` ADD CONSTRAINT `scrap_collection_process_vendor_id_vendor_user_id_fk` FOREIGN KEY (`vendor_id`) REFERENCES `vendor_user`(`id`) ON DELETE set null ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `scrap_collection_process` ADD CONSTRAINT `scrap_collection_process_scrap_item_id_scrap_item_id_fk` FOREIGN KEY (`scrap_item_id`) REFERENCES `scrap_item`(`id`) ON DELETE restrict ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `serviceable_pincode` ADD CONSTRAINT `serviceable_pincode_vendor_id_vendor_user_id_fk` FOREIGN KEY (`vendor_id`) REFERENCES `vendor_user`(`id`) ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `vendor_scrap_item` ADD CONSTRAINT `vendor_scrap_item_vendor_id_vendor_user_id_fk` FOREIGN KEY (`vendor_id`) REFERENCES `vendor_user`(`id`) ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `vendor_scrap_item` ADD CONSTRAINT `vendor_scrap_item_scrap_item_id_scrap_item_id_fk` FOREIGN KEY (`scrap_item_id`) REFERENCES `scrap_item`(`id`) ON DELETE cascade ON UPDATE cascade;