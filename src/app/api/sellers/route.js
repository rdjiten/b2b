"use server";

export async function GET() {
  const sellers = [
    {
      id: 1,
      name: "John's Handicrafts",
      image: "https://images.unsplash.com/photo-1556912996-8509dc9e6b16?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
      description: "Handcrafted items made with love and care.",
    },
    {
      id: 2,
      name: "EcoGreen Supplies",
      image: "https://images.unsplash.com/photo-1524583032164-56677f3b3c3f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
      description: "Eco-friendly products for a sustainable future.",
    },
    {
      id: 3,
      name: "Urban Threads",
      image: "https://images.unsplash.com/photo-1618354691243-6749dbfbdf48?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
      description: "Trendy clothing and accessories for modern lifestyles.",
    },
    {
      id: 4,
      name: "Gourmet Treats",
      image: "https://images.unsplash.com/photo-1612197526989-79a00beed07d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
      description: "Delicious homemade snacks and treats.",
    },
    {
      id: 5,
      name: "Tech Gear Pro",
      image: "https://images.unsplash.com/photo-1616401786761-2683eeadb7c9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
      description: "High-quality tech gadgets and accessories.",
    },
  ];

  return new Response(JSON.stringify(sellers), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
