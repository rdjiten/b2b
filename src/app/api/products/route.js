import { products } from '../../data/products'

export async function GET(req) {
    return new Response(JSON.stringify(products), { status: 200 });


}

export async function PATCH(req) {
    const { id, status } = await req.json();

    const product = products.find((p) => p.id === id);
    if (product) {
        product.status = status;
        return new Response(JSON.stringify(product), { status: 200 });
    }

    return new Response("Product not found", { status: 404 });
}


// export default function handler(req, res) {
//     if (req.method === "GET") {
//         res.status(200).json(products);
//     } else if (req.method === "POST") {
//         const newProduct = req.body;
//         products.push({ id: products.length + 1, ...newProduct });
//         res.status(201).json({ message: "Product added", product: newProduct });
//     } else if (req.method === "PUT") {
//         const { id, status } = req.body;
//         const product = products.find((p) => p.id === id);
//         if (product) {
//             product.status = status;
//             res.status(200).json({ message: "Product updated", product });
//         } else {
//             res.status(404).json({ message: "Product not found" });
//         }
//     } else {
//         res.setHeader("Allow", ["GET", "POST", "PUT"]);
//         res.status(405).end(`Method ${req.method} Not Allowed`);
//     }
// }