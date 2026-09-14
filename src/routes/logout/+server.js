import { redirect } from '@sveltejs/kit';

export function GET({ cookies }) {

    // Delete login cookie
    cookies.delete('userId', {
        path: '/'
    });

    throw redirect(303, '/');
}