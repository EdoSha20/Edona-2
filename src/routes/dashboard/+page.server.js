import db from '$lib/server/db';
import { redirect } from '@sveltejs/kit';
import { writeFile } from 'fs/promises';
import path from 'path';
import { fail, redirect } from '@sveltejs/kit';

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

export const actions = {

    default: async ({ request, cookies }) => {

        const userId = cookies.get('userId');

        if (!userId) {
            throw redirect(303, '/login');
        }

        const data = await request.formData();

        const file = data.get('pdf');

        // Check that a file was selected
        if (!file || file.size === 0) {
            return fail(400, {
                error: 'Keine Datei ausgewählt'
            });
        }

        // Only allow PDFs
        if (file.type !== 'application/pdf') {
            return fail(400, {
                error: 'Nur PDF-Dateien sind erlaubt'
            });
        }

        // Create unique filename
        const savedFilename =
            Date.now() + '-' + file.name;

        const filepath = path.join(
            'static',
            'uploads',
            savedFilename
        );

        // Convert uploaded PDF into bytes
        const buffer =
            Buffer.from(await file.arrayBuffer());

        // Save actual PDF
        await writeFile(filepath, buffer);

        // Save information inside MySQL
        await db.execute(
            `INSERT INTO pdfs
             (filename, filepath, user_id)
             VALUES (?, ?, ?)`,
            [
                file.name,
                '/uploads/' + savedFilename,
                userId
            ]
        );

        return {
            success: true
        };
    }
};