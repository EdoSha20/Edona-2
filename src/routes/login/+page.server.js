import db from '$lib/server/db';
import bcrypt from 'bcrypt';
import { fail, redirect } from '@sveltejs/kit';

export const actions = {
    default: async ({ request, cookies }) => {
        const data = await request.formData();

        const email = data.get('email');
        const password = data.get('password');

        const [users] = await db.execute(
            'SELECT * FROM users WHERE email = ?',
            [email]
        );

        const user = users[0];

        if (!user) {
            return fail(400, {
                error: 'Benutzer nicht gefunden'
            });
        }

        const passwordCorrect = await bcrypt.compare(
            password,
            user.password
        );

        if (!passwordCorrect) {
            return fail(400, {
                error: 'Falsches Passwort'
            });
        }

        cookies.set(
            'userId',
            String(user.id),
            {
                path: '/',
                httpOnly: true,
                sameSite: 'lax'
            }
        );

        if (user.role === 'ADMIN') {
            throw redirect(303, '/admin');
        }

        throw redirect(303, '/dashboard');
    }
};