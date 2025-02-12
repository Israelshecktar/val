// pages/set-name.js
import { useState } from "react";
import { useRouter } from "next/router";

export default function SetNamePage() {
  const [name, setName] = useState("");
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name) return;
    // Redirect to the home page, passing the name as a query param
    router.push(`/?loverName=${encodeURIComponent(name)}`);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-pink-200">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-md shadow-md text-center"
      >
        <h1 className="text-2xl font-bold mb-4">Set your Valentine's name</h1>
        <input
          type="text"
          placeholder="Enter your val's name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border border-gray-300 p-2 rounded w-full mb-4"
          required
        />
        <button
          type="submit"
          className="px-4 py-2 bg-pink-500 text-white rounded hover:bg-pink-600 transition"
        >
          Generate Link
        </button>
      </form>
    </div>
  );
}
