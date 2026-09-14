import db from '$lib/server/db';
import { redirect } from '@sveltejs/kit';

export async function load({ cookies }) {

    // Get logged-in user's ID
    const userId = cookies.get('userId');

    if (!userId) {
        throw redirect(303, '/login');
    }

    // Find logged-in user
    const [users] = await db.execute(
        'SELECT * FROM users WHERE id = ?',
        [userId]
    );

    const user = users[0];

    if (!user) {
        throw redirect(303, '/login');
    }

    // Admin shouldn't use normal dashboard
    if (user.role === 'ADMIN') {
        throw redirect(303, '/admin');
    }

    // Only load PDFs belonging to this user
    const [pdfs] = await db.execute(
        `SELECT *
         FROM pdfs
         WHERE user_id = ?
         ORDER BY created_at DESC`,
        [userId]
    );

    return {
        pdfs
    };
}