import type { Cookies } from '@sveltejs/kit';
import { fail, redirect } from '@sveltejs/kit';
import bcrypt from 'bcrypt';

import { db } from '$lib/server/database/client';
import { usuarios } from '$lib/server/database/tables';
import { eq } from 'drizzle-orm';

export const load = async () => {};

export const actions = {
	login: async ({ request, cookies }: { request: Request; cookies: Cookies }) => {
		const data = Object.fromEntries(await request.formData());
		const password = String(data.password);

		if (
			typeof data.email !== 'string' ||
			typeof data.password !== 'string' ||
			!data.email ||
			!data.password
		) {
			return fail(400, { invalid: true });
		}

		const user = await db.select().from(usuarios).where(eq(usuarios.email, data.email));

		if (!user || user.length === 0 || !user[0].contrasena) {
			return fail(400, { credentials: true });
		}

		if (user.length > 1) {
			return fail(400, { duplicate: true });
		}

		const findpass = await bcrypt.compare(password, user[0].contrasena);

		if (!findpass) {
			return fail(400, { credentials: true });
		}

		const authenticatedUser = crypto.randomUUID();

		await db
			.update(usuarios)
			.set({ token: authenticatedUser })
			.where(eq(usuarios.email, data.email));

		cookies.set('session', authenticatedUser, {
			// enviara la cookie en cada request
			path: '/',
			// vencimiento en 30 días
			maxAge: 60 * 60 * 24 * 30
		});

		// redirect the user
		redirect(302, '/');
	}
};
