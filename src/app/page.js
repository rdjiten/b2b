"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function HomePage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/products");
      const data = await res.json();
      setProducts(data);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();

    const interval = setInterval(() => {
      fetchProducts(); 
    }, 10000); 
    return () => {
      clearInterval(interval);
    };
  }, []);

  const getStatusChipColor = (status) => {
    switch (status) {
      case 'Available':
        return 'bg-green-500';
      case 'Out of Stock':
        return 'bg-yellow-500';
      case 'Unavailable':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <div className="mt-5 p-3">
      {loading ? (
        <div>Loading...</div>
      ) : products.length > 0 && (
        <>
          <h1 className="text-3xl font-semibold text-gray-800 mb-6">Product List</h1>
          <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.slice(0, 5).map((product) => (
              <div key={product.id} className="product-card">
                <h2 className="text-xl font-semibold text-gray-800 mb-2">{product.name}</h2>
                <p>{product.description}</p>
                <div className="status-chip">
                  <span
                    className={`text-white text-sm py-1 px-3 rounded-full ${getStatusChipColor(product.status)}`}
                  >
                    {product.status}
                  </span>
                </div>
                <Link href={`product/${product.id}`} className="btn mt-3 hover:text-white hover:bg-blue-200">
                  View Details
                </Link>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
