import db from '$lib/server/db';

export async function GET() {

    const [rows] = await db.execute(
        'SELECT 1 AS test'
    );

    return new Response(
        JSON.stringify(rows)
    );
}