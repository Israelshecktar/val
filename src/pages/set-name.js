import { useState } from "react";
import { Copy } from "lucide-react"; // Import copy icon
import toast, { Toaster } from "react-hot-toast"; // Import react-hot-toast

export default function SetNamePage() {
  const [name, setName] = useState("");
  const [generatedLink, setGeneratedLink] = useState("");

  const handleGenerateLink = (e) => {
    e.preventDefault();
    if (!name) return;
    // Generate the unique link
    const link = `${window.location.origin}/?loverName=${encodeURIComponent(name)}`;
    setGeneratedLink(link);
  };

  const handleCopyLink = () => {
    if (generatedLink) {
      navigator.clipboard.writeText(generatedLink);
      toast.success("Link copied! 🎉 Now send it to your Valentine!", {
        duration: 4000,
        style: {
          borderRadius: "10px",
          background: "#f9fafb",
          color: "#333",
        },
      });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-pink-200 px-4 relative">
      {/* Toaster for notifications */}
      <Toaster position="top-center" />

      <div className="bg-white p-6 rounded-md shadow-md text-center w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-pink-600">
          Set your Valentine's name
        </h1>
        <form onSubmit={handleGenerateLink}>
          <input
            type="text"
            placeholder="Enter your val's name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border border-gray-300 p-2 rounded w-full mb-4 text-center"
            required
          />
          <button
            type="submit"
            className="px-4 py-2 bg-pink-500 text-white rounded hover:bg-pink-600 transition w-full"
          >
            Generate Link
          </button>
        </form>

        {/* Show generated link and copy button */}
        {generatedLink && (
          <div className="mt-4 bg-gray-100 p-3 rounded-md text-center flex items-center justify-between">
            <span className="text-gray-700 text-sm truncate">{generatedLink}</span>
            <button
              onClick={handleCopyLink}
              className="ml-2 text-pink-600 hover:text-pink-800 transition"
            >
              <Copy size={20} />
            </button>
          </div>
        )}

        {/* Send message */}
        {generatedLink && (
          <p className="mt-3 text-sm text-gray-700 font-medium">
            🎁 Copy & Send this to your Valentine! 💖
          </p>
        )}
      </div>

      {/* Footer - "Built by Shecktar" */}
      <footer className="fixed bottom-4 w-full text-center text-blue-700 font-semibold text-sm">
        Built with ❤️ by Shecktar
      </footer>
    </div>
  );
}
