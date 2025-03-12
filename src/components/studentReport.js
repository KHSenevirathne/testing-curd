"use client";
import { useState } from "react";

export default function StudentReport() {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [grade, setGrade] = useState("");
  const [message, setMessage] = useState("");

  // 1) Handle Search
  const handleSearch = async () => {
    if (!name) {
      setMessage("Please enter a name to search");
      return;
    }
    try {
      const res = await fetch(`/api/students?name=${name}`);
      if (!res.ok) {
        // If status is not 200, show an error
        const data = await res.json();
        setMessage(data.message || "Incorrect name");
        // Clear address & grade if not found
        setAddress("");
        setGrade("");
      } else {
        const data = await res.json();
        // Auto-fill the address & grade
        setAddress(data.student.address || "");
        setGrade(data.student.grade || "");
        setMessage("Student found!");
      }
    } catch (error) {
      console.error(error);
      setMessage("An error occurred while searching");
    }
  };

  // 2) Handle Add
  const handleAdd = async () => {
    if (!name || !address || !grade) {
      setMessage("Please fill out all fields before adding");
      return;
    }
    try {
      const res = await fetch("/api/students", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, address, grade }),
      });
      const data = await res.json();
      if (!res.ok) {
        setMessage(data.message || "Error adding student");
      } else {
        setMessage("Student added successfully!");
        // Optionally clear the form
        setName("");
        setAddress("");
        setGrade("");
      }
    } catch (error) {
      console.error(error);
      setMessage("An error occurred while adding student");
    }
  };

  // 3) Handle Update
  const handleUpdate = async () => {
    if (!name || !address || !grade) {
      setMessage("Please fill out all fields before updating");
      return;
    }
    try {
      const res = await fetch("/api/students", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, address, grade }),
      });
      const data = await res.json();
      if (!res.ok) {
        setMessage(data.message || "Error updating student");
      } else {
        setMessage("Student updated successfully!");
        // Optionally clear the form
        setName("");
        setAddress("");
        setGrade("");
      }
    } catch (error) {
      console.error(error);
      setMessage("An error occurred while updating student");
    }
  };
  
  // 4) Handle Delete
  const handleDelete = async () => {
    if (!name) {
      setMessage("Please enter a name before deleting");
      return;
    }
    try {
      const res = await fetch("/api/students", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name }),
      });
      const data = await res.json();
      if (!res.ok) {
        setMessage(data.message || "Error deleting student");
      } else {
        setMessage("Student deleted successfully!");
        // Optionally clear the form
        setName("");
        setAddress("");
        setGrade("");
      }
    } catch (error) {
      console.error(error);
      setMessage("An error occurred while deleting student");
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4 text-gray-900">Student Report Page</h1>

      <form
        className="space-y-4"
        // Prevent default form submission
        onSubmit={(e) => e.preventDefault()}
      >
        {/* Student Name with Search Button */}
        <div>
          <label className="block text-sm font-medium text-gray-900">
            Student Name
          </label>
          <div className="flex items-center space-x-2">
            <input
              type="text"
              className="mt-1 p-2 w-full border rounded-md focus:ring focus:ring-blue-400 text-gray-900"
              placeholder="Enter name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <button
              type="button"
              onClick={handleSearch}
              className="mt-1 px-4 py-2 bg-blue-700 text-white rounded-md hover:bg-blue-800 focus:ring-2 focus:ring-blue-500"
            >
              Search
            </button>
          </div>
        </div>

        {/* Address Field */}
        <div>
          <label className="block text-sm font-medium text-gray-900">
            Address
          </label>
          <input
            type="text"
            className="mt-1 p-2 w-full border rounded-md focus:ring focus:ring-blue-400 text-gray-900"
            placeholder="Enter address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>

        {/* Grade Field */}
        <div>
          <label className="block text-sm font-medium text-gray-900">
            Grade
          </label>
          <input
            type="text"
            className="mt-1 p-2 w-full border rounded-md focus:ring focus:ring-blue-400 text-gray-900"
            placeholder="Enter grade"
            value={grade}
            onChange={(e) => setGrade(e.target.value)}
          />
        </div>

        {/* Buttons */}
        <div className="space-x-4">
          <button
            type="button"
            onClick={handleAdd}
            className="mt-1 px-4 py-2 bg-green-700 text-white rounded-md hover:bg-green-800 focus:ring-2 focus:ring-green-500"
          >
            Add
          </button>
          <button
            type="button"
            onClick={handleUpdate}
            className="mt-1 px-4 py-2 bg-yellow-600 text-black rounded-md hover:bg-yellow-700 focus:ring-2 focus:ring-yellow-500"
          >
            Update
          </button>
          <button
            type="button"
            onClick={handleDelete}
            className="mt-1 px-4 py-2 bg-red-700 text-white rounded-md hover:bg-red-800 focus:ring-2 focus:ring-red-500"
          >
            Delete
          </button>
        </div>
      </form>

      {/* Message / Errors / Success */}
      {message && (
        <p className="mt-4 text-sm text-red-600">{message}</p>
      )}
    </div>
  );
}
