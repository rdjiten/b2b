// app/seller/[id]/SellerProfile.js
'use client';

export default function SellerProfile({ seller }) {
  return (
    <div>
      <h1>Seller Profile</h1>
      <h2>{seller.name}</h2>
      <p>Email: {seller.email}</p>
      <p>Contact: {seller.contact}</p>
      <h3>Products:</h3>
      <ul>
        {seller.products.map((product) => (
          <li key={product.id}>{product.name}</li>
        ))}
      </ul>
    </div>
  );
}
