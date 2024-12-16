"use client";

import { useState, useEffect, use } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import styles from "./SellerProfile.module.css"; 

export default function SellerProfile({ params }) {
    const { id } = use(params);
    const [seller, setSeller] = useState(null);
    const [status, setStatus] = useState("");
    const [loading, setLoading] = useState(true);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        async function fetchSellerData() {
            try {
                // Fetch seller data
                const res = await fetch(`/api/sellers`);
                if (!res.ok) throw new Error("Failed to fetch seller data");

                const sellers = await res.json();
                const foundSeller = sellers.find((s) => s.id === parseInt(id));
                console.log(foundSeller)
                if (foundSeller) {
                    setSeller(foundSeller);
                    setStatus(foundSeller.status);

                    const productRes = await fetch(`/api/products`);
                    if (!productRes.ok) throw new Error("Failed to fetch products");

                    const productsData = await productRes.json();
                    debugger
                    const sellerProducts = productsData.filter(product => product.sellerId === (id));

                    setProducts(sellerProducts);
                } else {
                    notFound();
                }
            } catch (error) {
                console.error("Error fetching data:", error);
                notFound();
            } finally {
                setLoading(false);
            }
        }

        fetchSellerData();
    }, [id]);

    if (loading) return <div className={styles["loading-spinner"]}>Loading...</div>;

    if (!seller) {
        return (
            <div>
                Seller doesn't exist. Go to <Link href="/">Dashboard</Link>
            </div>
        );
    }

    return (
        <div className={styles["seller-profile-container"]}>
            <div className={styles["profile-card"]}>
                <h2>{seller.name}</h2>
                <p><strong>Contact:</strong> {seller.contact}</p>
                <p><strong>Description:</strong> {seller.description}</p>

                <h3 className="text-2xl mt-5">Products Sold</h3>
                <ul className={styles[""]}>
                    {products.length > 0 ? (
                        products.map((product) => (
                            <li key={product.id} className={styles["product-item"]}>
                                <strong>{product.name}</strong>: {product.description} - {product.status}
                            </li>
                        ))
                    ) : (
                        <p>No products listed.</p>
                    )}
                </ul>
                <Link href={`/profile`} passHref>
                    <button
                        className="btn mt-3 hover:text-white hover:bg-blue-200"
                    >
                        Edit Profile
                    </button>
                </Link>
            </div>
        </div>
    );
}
