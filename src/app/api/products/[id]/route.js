import { connectToDatabase } from '../../../lib/db'; // Adjust path if needed

export async function PUT(req, { params }) {
    const { id } = params;
    const { status } = await req.json();

    try {
        // Connect to the MongoDB database
        const db = await connectToDatabase();

        if (!db) {
            console.error("Database connection failed");
            return new Response('Database connection failed', { status: 500 });
        }

        // Find the product by ID and update its status
        const result = await db.collection('products').updateOne(
            { id: parseInt(id) },
            { $set: { status: status } }
        );

        if (result.matchedCount === 0) {
            return new Response('Product not found', { status: 404 });
        }

        return new Response('Product status updated', { status: 200 });
    } catch (error) {
        console.error('Error updating product status:', error);
        return new Response('Error updating product status', { status: 500 });
    }
}
