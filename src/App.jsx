import React from "react";

const App = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="p-8 rounded-xl bg-white shadow-2xl text-center">
        <h1 className="text-3xl font-bold text-red-400 mb-4">
          Tailwind is Working 🚀
        </h1>
        <p className="text-gray-600 mb-6">
          If you see colors, spacing, and shadows — you’re good!
        </p>
        <button className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition">
          Test Button
        </button>
      </div>
    </div>
  );
};

export default App;
