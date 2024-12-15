"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
// import { logout } from "../login/actions";

export default function Dashboard() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await fetch("/api/products");
      const data = await res.json();
      setProducts(data);
    };

    fetchProducts();
  }, []);

  return (
    <div>
      <button
      // onClick={() => logout()}
      >Logout</button>
      <h1>Product List</h1>
      <div className="product-grid">
        {products.slice(0, 5).map((product) => (
          <div key={product.id} className="product-card">
            <h2>{product.name}</h2>
            <p>{product.description}</p>
            <p>Status: {product.status}</p>
            <Link href={`product/${product.id}`} >Go</Link>
            <div className="text-center">
              <button onClick={() => alert(`Viewing details for ${product.name}`)}>
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
