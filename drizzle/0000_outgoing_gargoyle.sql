-- Current sql file was generated after introspecting the database
-- If you want to run this migration please uncomment this code before executing migrations
/*
CREATE TABLE `escritos` (
	`autor_id` integer,
	`libro_id` integer,
	FOREIGN KEY (`libro_id`) REFERENCES `libros`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`autor_id`) REFERENCES `autores`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `calificaciones` (
	`book_id` integer,
	`calificacion` integer,
	FOREIGN KEY (`book_id`) REFERENCES `libros`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `traducidos` (
	`traductor_id` integer,
	`libro_id` integer,
	FOREIGN KEY (`libro_id`) REFERENCES `libros`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`traductor_id`) REFERENCES `traductores`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `session` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`expires_at` integer NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `user` (
	`id` text PRIMARY KEY NOT NULL,
	`email` text NOT NULL,
	`password` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `user_email_unique` ON `user` (`email`);--> statement-breakpoint
CREATE TABLE `users` (
	`id` integer PRIMARY KEY NOT NULL,
	`nombre` text NOT NULL,
	`email` text
);
--> statement-breakpoint
CREATE TABLE `usuarios` (
	`id` text PRIMARY KEY NOT NULL,
	`nombre` text NOT NULL,
	`email` text NOT NULL,
	`rol` text NOT NULL,
	`contrasena` text,
	`token` text,
	`edad` numeric
);
--> statement-breakpoint
CREATE TABLE `autores` (
	`id` integer PRIMARY KEY NOT NULL,
	`nombre` text,
	`pais` text,
	`nacimiento` integer
);
--> statement-breakpoint
CREATE TABLE `libros` (
	`id` integer PRIMARY KEY NOT NULL,
	`isbn` text,
	`titulo` text,
	`editorial_id` integer,
	`format` text,
	`pages` integer,
	`publicado` text,
	`year` integer,
	FOREIGN KEY (`editorial_id`) REFERENCES `editores`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `editores` (
	`id` integer PRIMARY KEY NOT NULL,
	`editorial` text
);
--> statement-breakpoint
CREATE TABLE `traductores` (
	`id` integer PRIMARY KEY NOT NULL,
	`nombre` text
);

*/