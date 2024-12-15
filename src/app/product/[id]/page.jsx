"use client";

import { useState, useEffect, use } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";

export default function ProductPage({ params }) {
    const { id } = use(params);
    const [product, setProduct] = useState(null);
    const [status, setStatus] = useState("");
    const [loading, setLoading] = useState(true);

    // Fetch product details
    useEffect(() => {
        async function fetchProduct() {
            try {
                const res = await fetch(`/api/products`);
                if (!res.ok) throw new Error("Failed to fetch products");

                const products = await res.json();
                const foundProduct = products.find((p) => p.id === parseInt(id));

                if (foundProduct) {
                    setProduct(foundProduct);
                    setStatus(foundProduct.status);
                } else {
                    // Trigger notFound() if the product doesn't exist
                    notFound();
                }
            } catch (error) {
                console.error("Error fetching product:", error);
                notFound(); // Redirect to 404 if an error occurs
            } finally {
                setLoading(false);
            }
        }

        fetchProduct();
    }, [id]);

    if (loading) return <div className="text-center py-10">Loading...</div>;
    if (!product) {
        return (
            <div className="text-center py-10">
                <p>Product doesn't exist. Go to <Link href="/dashboard" className="text-blue-500 hover:underline">Dashboard</Link></p>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md">
                <h1 className="text-3xl font-bold text-gray-800 mb-4">{product.name}</h1>
                <p className="text-lg text-gray-600 mb-6">{product.description}</p>
                <div className="flex items-center mb-4">
                    <strong className="text-gray-800 mr-2">Status:</strong>
                    <span className={`text-white text-sm py-1 px-3 rounded-full ${getStatusChipColor(product.status)}`}>
                        {product.status}
                    </span>
                </div>

                <div className="mb-6">
                    <label htmlFor="status" className="block text-gray-700 font-medium mb-2">Update Status:</label>
                    <select
                        id="status"
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="Available">Available</option>
                        <option value="Sold">Sold</option>
                    </select>
                </div>

                <button
                    onClick={async () => {
                        const res = await fetch(`/api/products`, {
                            method: "PATCH",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({ id, status }),
                        });
                        if (res.ok) {
                            const updatedProduct = await res.json();
                            setProduct(updatedProduct);
                            alert("Product status updated!");
                        } else {
                            alert("Failed to update status.");
                        }
                    }}
                    className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition-colors"
                >
                    Update Status
                </button>
            </div>
        </div>
    );
}

const getStatusChipColor = (status) => {
    switch (status) {
        case 'Available':
            return 'bg-green-500';
        case 'Sold':
            return 'bg-gray-500';
        default:
            return 'bg-red-500';
    }
};
