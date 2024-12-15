"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function SellersPage() {
    const [sellers, setSellers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchSellers() {
            try {
                const response = await fetch("/api/sellers");
                if (!response.ok) {
                    throw new Error("Failed to fetch sellers data");
                }
                const data = await response.json();
                setSellers(data);
            } catch (error) {
                console.error("Error fetching sellers:", error);
            } finally {
                setLoading(false);
            }
        }

        fetchSellers();
    }, []);

    if (loading) {
        return <div>Loading sellers...</div>;
    }

    return (
        <div className="p-3 ">
            <h1>Sellers</h1>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "16px" }}>
                {sellers.map((seller) => (
                    <div
                        key={seller.id}
                        style={{
                            border: "1px solid #ccc",
                            padding: "16px",
                            borderRadius: "8px",
                            maxWidth: "250px",
                            boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
                        }}
                    >
                        <h3 className="font-bold">{seller.name}</h3>
                        <p><strong>Contact:</strong> {seller.contact}</p>
                        <p>{seller.description}</p>
                        <Link href={`/seller/${seller.id}`} passHref>
                            <button
                                className="btn mt-3 hover:text-white hover:bg-blue-200"
                            >
                                View Profile
                            </button>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
}
