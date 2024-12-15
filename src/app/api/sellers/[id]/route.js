// app/api/sellers/[id]/route.js
import { connectToDatabase } from '@/lib/db';
import { ObjectId } from 'mongodb';
import { use } from 'react';

export async function GET(req, { params }) {
    const { id } = use(params);

    try {
        const db = await connectToDatabase();
        const seller = await db.collection('sellers').findOne({ _id: new ObjectId(id) });

        if (!seller) {
            return new Response(JSON.stringify({ error: 'Seller not found' }), { status: 404 });
        }

        return new Response(JSON.stringify(seller), { status: 200 });
    } catch (error) {
        console.error('Failed to fetch seller:', error);
        return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
    }
}
