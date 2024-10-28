import { sqliteTable, AnySQLiteColumn, foreignKey, integer, text, uniqueIndex, numeric } from "drizzle-orm/sqlite-core"
  import { sql } from "drizzle-orm"

export const escritos = sqliteTable("escritos", {
	autorId: integer("autor_id").references(() => autores.id),
	libroId: integer("libro_id").references(() => libros.id),
});

export const calificaciones = sqliteTable("calificaciones", {
	bookId: integer("book_id").references(() => libros.id),
	calificacion: integer(),
});

export const traducidos = sqliteTable("traducidos", {
	traductorId: integer("traductor_id").references(() => traductores.id),
	libroId: integer("libro_id").references(() => libros.id),
});

export const session = sqliteTable("session", {
	id: text().primaryKey().notNull(),
	userId: text("user_id").notNull().references(() => user.id),
	expiresAt: integer("expires_at").notNull(),
});

export const user = sqliteTable("user", {
	id: text().primaryKey().notNull(),
	email: text().notNull(),
	password: text().notNull(),
},
(table) => {
	return {
		emailUnique: uniqueIndex("user_email_unique").on(table.email),
	}
});

export const users = sqliteTable("users", {
	id: integer().primaryKey().notNull(),
	nombre: text().notNull(),
	email: text(),
});

export const usuarios = sqliteTable("usuarios", {
	id: text().primaryKey().notNull(),
	nombre: text().notNull(),
	email: text().notNull(),
	rol: text().notNull(),
	contrasena: text(),
	token: text(),
	edad: numeric(),
});

export const autores = sqliteTable("autores", {
	id: integer().primaryKey().notNull(),
	nombre: text(),
	pais: text(),
	nacimiento: integer(),
});

export const libros = sqliteTable("libros", {
	id: integer().primaryKey().notNull(),
	isbn: text(),
	titulo: text(),
	editorialId: integer("editorial_id").references(() => editores.id),
	format: text(),
	pages: integer(),
	publicado: text(),
	year: integer(),
});

export const editores = sqliteTable("editores", {
	id: integer().primaryKey().notNull(),
	editorial: text(),
});

export const traductores = sqliteTable("traductores", {
	id: integer().primaryKey().notNull(),
	nombre: text(),
});

