"use client";

export default function LogoutButton() {
  const handleLogout = async () => {
    try {
      const res = await fetch('/api/logout', {
        method: 'POST',
      });
      if (res.ok) {
        // Redirect to login after logout
        window.location.href = '/login';
      } else {
        const error = await res.json();
        console.error("Logout failed:", error.error);
        alert("Logout failed!");
      }
    } catch (err) {
      console.error("Error logging out:", err);
      alert("Something went wrong!");
    }
  };

  return <button className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:outline-none" onClick={handleLogout}>Logout</button>;
}
