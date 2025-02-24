import { relations } from "drizzle-orm/relations";
import { libros, escritos, autores, calificaciones, traducidos, traductores, user, session, editores } from "./schema";

export const escritosRelations = relations(escritos, ({one}) => ({
	libro: one(libros, {
		fields: [escritos.libroId],
		references: [libros.id]
	}),
	autore: one(autores, {
		fields: [escritos.autorId],
		references: [autores.id]
	}),
}));

export const librosRelations = relations(libros, ({one, many}) => ({
	escritos: many(escritos), 
	calificaciones: many(calificaciones),
	traducidos: many(traducidos),
	editore: one(editores, {
		fields: [libros.editorialId],
		references: [editores.id]
	}),
}));

export const autoresRelations = relations(autores, ({many}) => ({
	escritos: many(escritos),
}));

export const calificacionesRelations = relations(calificaciones, ({one}) => ({
	libro: one(libros, {
		fields: [calificaciones.bookId],
		references: [libros.id]
	}),
}));

export const traducidosRelations = relations(traducidos, ({one}) => ({
	libro: one(libros, {
		fields: [traducidos.libroId],
		references: [libros.id]
	}),
	traductore: one(traductores, {
		fields: [traducidos.traductorId],
		references: [traductores.id]
	}),
}));

export const traductoresRelations = relations(traductores, ({many}) => ({
	traducidos: many(traducidos),
}));

export const sessionRelations = relations(session, ({one}) => ({
	user: one(user, {
		fields: [session.userId],
		references: [user.id]
	}),
}));

export const userRelations = relations(user, ({many}) => ({
	sessions: many(session),
}));

export const editoresRelations = relations(editores, ({many}) => ({
	libros: many(libros),
}));