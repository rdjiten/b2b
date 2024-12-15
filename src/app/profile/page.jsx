"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function Profile() {
    const userId = 1;
    const [userDetails, setUserDetails] = useState({});
    useEffect(() => {

        if (typeof window !== "undefined") {

            const user = JSON.parse(localStorage.getItem("user"))
            setUserDetails(user);
        }
    }, [])

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        address: "",
    });

    useEffect(() => {
        if (userDetails) {
            setFormData({
                ...formData,
                name: userDetails.name,
                email: userDetails.email,
                phone: userDetails.phoneNumber,
                address: userDetails.address,

            })
        }
    }, [userDetails])

    const [isEditing, setIsEditing] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSave = () => {
        // Implement save logic (e.g., API call to save profile data)
        setIsEditing(false);
    };

    const handleEdit = () => {
        setIsEditing(true);
    };

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await fetch(`/api/user/${userId}`);
                if (res.ok) {
                    const data = await res.json();
                    setUser(data);
                } else {
                    console.error('Failed to fetch user');
                }
            } catch (error) {
                console.error('Error fetching user:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, [userId]);

    return (
        <div className="min-h-screen bg-gray-100 py-12 px-6">
            <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-lg">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <div className="relative">
                            <img
                                src="https://randomuser.me/api/portraits/men/1.jpg"
                                alt="User Avatar"
                                className="w-24 h-24 rounded-full object-cover"
                            />
                        </div>
                        <div>
                            <h2 className="text-2xl font-semibold text-gray-800">{userDetails.name || ""}</h2>
                            <p className="text-sm text-gray-500">{userDetails.email || ""}</p>
                        </div>
                    </div>
                    <div>
                        <button
                            onClick={isEditing ? handleSave : handleEdit}
                            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                        >
                            {isEditing ? "Save" : "Edit"}
                        </button>
                    </div>
                </div>

                <div className="mt-8 space-y-6">
                    {formData.name
                        ?
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-600">Full Name</label>
                            <input
                                id="name"
                                name="name"
                                type="text"
                                value={formData.name}
                                onChange={handleChange}
                                disabled={!isEditing}
                                className="mt-2 p-3 w-full border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-600"
                            />
                        </div>
                        :
                        ""
                    }

                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-600">Email</label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            disabled={!isEditing}
                            className="mt-2 p-3 w-full border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-600"
                        />
                    </div>
                    {formData.phone
                        ?
                        <div>
                            <label htmlFor="phone" className="block text-sm font-medium text-gray-600">Phone</label>
                            <input
                                id="phone"
                                name="phone"
                                type="tel"
                                value={formData.phone}
                                onChange={handleChange}
                                disabled={!isEditing}
                                className="mt-2 p-3 w-full border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-600"
                            />
                        </div>
                        : ""}

                    {formData.address
                        ?
                        <div>
                            <label htmlFor="address" className="block text-sm font-medium text-gray-600">Address</label>
                            <input
                                id="address"
                                name="address"
                                value={formData.address}
                                onChange={handleChange}
                                disabled={!isEditing}
                                className="mt-2 p-3 w-full border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-600"
                            ></input>
                        </div>
                        : ""}
                </div>

                <div className="mt-6">
                    <Link href="/" className="text-sm text-indigo-600 hover:text-indigo-500">
                        Back to Dashboard
                    </Link>
                </div>
            </div>
        </div>
    );
}
