// app/seller/[id]/page.jsx
"use client";

import { useState, useEffect, use } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";

export default function ProductPage({ params }) {
    const { id } = use(params);
    const [seller, setSeller] = useState(null);
    const [status, setStatus] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchProduct() {
            try {
                const res = await fetch(`/api/sellers`);
                if (!res.ok) throw new Error("Failed to fetch products");

                const sellers = await res.json();
                const foundProduct = sellers.find((p) => p.id === parseInt(id));

                if (foundProduct) {
                    setSeller(foundProduct);
                    setStatus(foundProduct.status);
                } else {
                    // Trigger notFound() if the seller doesn't exist
                    notFound();
                }
            } catch (error) {
                console.error("Error fetching seller:", error);
                notFound(); // Redirect to 404 if an error occurs
            } finally {
                setLoading(false);
            }
        }

        fetchProduct();
    }, [id]);

    if (loading) return <p>Loading...</p>;
    if (!seller) {
        return <>Product doesn't exists. Go to <Link href="/">Dashboard</Link></>; 
    }
    return (
        <div style={{ padding: "1rem" }}>
            <h1>Seller Profile</h1>

            <h1>{seller.name}</h1>
            <p>{seller.description}</p>
            <p>
                <strong>Status:</strong> {seller.status}
            </p>
            <label>
                Update Status:{" "}
                <select value={status} onChange={(e) => setStatus(e.target.value)}>
                    <option value="Available">Available</option>
                    <option value="Sold">Sold</option>
                </select>
            </label>
            <button onClick={async () => {
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
            }}>Update</button>
        </div>
    );
}
