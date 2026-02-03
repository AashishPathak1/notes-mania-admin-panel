import React, { useEffect, useState } from "react";
import axios from "axios";
import { FiEdit2, FiTrash2, FiPlus, FiBookOpen, FiX } from "react-icons/fi";

const API_BASE = "https://bookmainabackend.onrender.com/api/M2";

const CourseName = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [courseName, setCourseName] = useState("");
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);

  const fetchCourses = async () => {
    try {
      const res = await axios.get(`${API_BASE}/getAllCourseName`);
      if (res.data.success) {
        setCourses(res.data.data);
      }
    } catch (error) {
      console.error("GET Courses Error:", error);
    } finally {
      setPageLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const handleSave = async () => {
    if (!courseName.trim()) {
      alert("Course name is required");
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post(`${API_BASE}/addCourseName`, { courseName });

      if (res.data.success) {
        setCourses((prev) => [...prev, res.data.data]);
        setCourseName("");
        setIsOpen(false);
      }
    } catch (error) {
      console.error("POST Course Error:", error);
      alert("Failed to add course");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (course) => {
    alert(`Edit course: ${course.courseName}`);
  };

  const handleDelete = (id) => {
    alert(`Delete course id: ${id}`);
  };

  return (
    <div className="w-full font-sans">
      <div className="mx-auto">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
              Course Management
            </h1>
            <p className="text-slate-500 mt-1">
              Manage and organize your educational programs.
            </p>
          </div>

          <button
            onClick={() => setIsOpen(true)}
            className="flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-lg font-medium transition-all shadow-sm active:scale-95"
          >
            <span>Add New Course</span>
            <FiPlus size={20} />
          </button>
        </div>

        {/* Modal */}
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
              onClick={() => setIsOpen(false)}
            ></div>
            <div className="relative bg-white w-full max-w-md rounded-2xl shadow-2xl border border-slate-100 overflow-hidden transform transition-all">
              <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                <h2 className="text-lg font-semibold text-slate-800">
                  Create New Course
                </h2>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 rounded-full hover:bg-slate-200 text-slate-500 transition-colors"
                >
                  <FiX className="bg-red-500 rounded-full" size={20} />
                </button>
              </div>

              <div className="p-6">
                <label className="block mb-4">
                  <span className="text-sm font-semibold text-slate-700 block mb-2">
                    Course Name
                  </span>
                  <input
                    type="text"
                    autoFocus
                    value={courseName}
                    onChange={(e) => setCourseName(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 focus:outline-none transition-all placeholder:text-slate-400"
                    placeholder="e.g. Advanced Web Development"
                  />
                </label>

                <div className="flex justify-end gap-3 mt-8">
                  <button
                    className="px-5 py-2.5 rounded-lg text-slate-600 font-medium hover:bg-slate-100 transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    disabled={loading}
                    className="px-6 py-2.5 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md shadow-indigo-200"
                  >
                    {loading ? "Creating..." : "Add Course"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Main Content Area */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          {pageLoading ? (
            <div className="py-20 flex flex-col items-center justify-center space-y-4">
              <div className="w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
              <p className="text-slate-500 font-medium tracking-wide">
                Fetching courses...
              </p>
            </div>
          ) :
           (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50/50 border-b border-slate-200">
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">
                      #
                    </th>
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">
                      Course Detail
                    </th>
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">
                      Created
                    </th>
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500 text-center">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-100">
                  {courses.length === 0 ? (
                    <tr>
                      <td colSpan="4" className="py-20 text-center">
                        <div className="flex flex-col items-center justify-center text-slate-400">
                          <FiBookOpen size={48} className="mb-3 opacity-20" />
                          <p className="text-lg font-medium text-slate-500">
                            No courses found
                          </p>
                          <p className="text-sm">
                            Start by adding your first course above.
                          </p>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    courses.map((course, index) => (
                      <tr
                        key={course._id}
                        className="group hover:bg-indigo-50/30 transition-colors"
                      >
                        <td className="px-6 py-4">
                          <span className="text-slate-400 font-mono text-sm">
                            {String(index + 1).padStart(2, "0")}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="font-semibold text-slate-800">
                            {course.courseName}
                          </div>
                          <div className="text-xs text-slate-400 font-mono mt-0.5">
                            {course._id}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-slate-600">
                            {new Date(course.createdAt).toLocaleDateString(
                              undefined,
                              {
                                month: "short",
                                day: "numeric",
                                year: "numeric"
                              }
                            )}
                          </div>
                          <div className="text-[10px] text-slate-400 uppercase">
                            Updated{" "}
                            {new Date(course.updatedAt).toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit"
                            })}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex justify-center gap-2">
                            <button
                              onClick={() => handleEdit(course)}
                              className="p-2 rounded-lg bg-white border border-slate-200 text-slate-600 hover:text-indigo-600 hover:border-indigo-200 hover:bg-indigo-50 transition-all shadow-sm"
                              title="Edit Course"
                            >
                              <FiEdit2 size={16} />
                            </button>
                            <button
                              onClick={() => handleDelete(course._id)}
                              className="p-2 rounded-lg bg-white border border-slate-200 text-slate-600 hover:text-red-600 hover:border-red-200 hover:bg-red-50 transition-all shadow-sm"
                              title="Delete Course"
                            >
                              <FiTrash2 size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}

          <div className="px-6 py-4 bg-slate-50 border-t border-slate-200">
            <p className="text-xs text-slate-500 font-medium">
              Showing {courses.length} total courses
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseName;
