import React from "react";
import { Link } from "react-router-dom";

const Admin = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <p className="text-gray-700 text-base mb-3">
          Welcome to the Admin Dashboard. Features coming soon.
        </p>
        <Link
          className="p-3 border rounded-xl font-semibold hover:text-white hover:bg-blue-700"
          to="/products/create"
        >
          Add a new Product
        </Link>
      </div>
    </div>
  );
};

export default Admin;
