import React, { useState } from "react";

const CourseName = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        className="bg-black inline-flex text-white p-2 rounded justify-end "
        onClick={() => setIsOpen(true)}
      >
        Add Course
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 z-50 grid place-content-center bg-black/50 p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modalTitle"
        >
          <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
            <div className="flex items-start justify-between">
              <h2 id="modalTitle" className="text-xl font-bold text-gray-900">
                Add Course
              </h2>

              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="-me-4 -mt-4 rounded-full p-2 text-gray-400 hover:bg-gray-100"
              >
                ✕
              </button>
            </div>

            <div className="mt-4">
              <label className="block">
                <span className="text-sm font-medium text-gray-700">
                  Course Name
                </span>

                <input
                  type="text"
                  className="mt-1 w-full rounded border border-gray-300 p-2"
                  placeholder="Enter course name"
                />
              </label>
            </div>

            <footer className="mt-6 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="rounded bg-gray-100 px-4 py-2 text-sm"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="rounded bg-blue-600 px-4 py-2 text-sm text-white"
              >
                Save
              </button>
            </footer>
          </div>
        </div>
      )}
    </>
  );
};

export default CourseName;
