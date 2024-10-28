import type { RequestEvent } from '@sveltejs/kit';
import { fail, redirect } from '@sveltejs/kit';
import bcrypt from 'bcrypt';

import { db } from '$lib/server/database/client';
import { usuarios } from '$lib/server/database/tables';
import { and, eq } from 'drizzle-orm';


export const load = async () => {
  // todo
}


export const actions = {


  register: async ({ request }: RequestEvent) => {
    const data = Object.fromEntries(await request.formData())

    if (
      typeof data.email !== 'string' ||
      typeof data.password !== 'string' ||
      typeof data.username !== 'string' ||
      typeof data.edad !== 'string' ||
      !data.email ||
      !data.password ||
      !data.username ||
      !data.edad
    ) {
      return fail(400, { invalid: true })
    }

    const user = await db.select().from(usuarios).where(eq(usuarios.email, data.email))
    
    console.log(user)
    const edadUsuario = parseInt(data.edad)
    console.log(data.edadUsuario)

    
    if (user.length > 0) {
      return fail(400, { user: true })
    }
    
    
    await db.insert(usuarios).values({ 
      id: crypto.randomUUID(),
      nombre: data.username,
      email: data.email, 
      rol: 'sdkfs',
      contrasena: await bcrypt.hash(data.password, 10),
      token: crypto.randomUUID(),
      edad: data.edad
    })
    
    redirect(303, '/login')
  }
}


