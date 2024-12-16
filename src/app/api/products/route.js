import { connectToDatabase } from '../../lib/db';
export async function GET(req) {
    try {
        
        const db = await connectToDatabase();

        
        if (!db) {
            console.error("Database connection failed");
            return new Response('Database connection failed', { status: 500 });
        }

        // Fetch products from the 'products' collection
        const products = await db.collection('products').find().toArray();

        // Return the products as JSON
        return new Response(JSON.stringify(products), { status: 200 });
    } catch (error) {
        console.error('Error fetching products:', error);
        return new Response('Error fetching products', { status: 500 });
    }
}
