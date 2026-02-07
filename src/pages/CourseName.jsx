import React, { useEffect, useState } from "react";
import api from "../api/api";
import { FiEdit2, FiTrash2, FiPlus, FiBookOpen, FiX } from "react-icons/fi";

const CourseName = () => {
  const ITEMS_PER_PAGE = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const [isOpen, setIsOpen] = useState(false);
  const [courseName, setCourseName] = useState("");
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [courseDurationInYear, setCourseDurationInYear] = useState("");
  const [isSemester, setIsSemester] = useState(false);
  const [semesterCount, setSemesterCount] = useState("");
  const [pageLoading, setPageLoading] = useState(true);

  const totalPages = Math.ceil(courses.length / ITEMS_PER_PAGE);
  const paginatedCourses = courses.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const fetchCourses = async () => {
    try {
      const res = await api.get(`/getAllCourseName`);
      if (res.data?.data) {
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
    const name = courseName?.trim();
    if (!name) {
      alert("Course name is required");
      return;
    }

    if (!courseDurationInYear) {
      alert("Course duration is required");
      return;
    }

    const duration = Number(courseDurationInYear);
    if (Number.isNaN(duration) || duration <= 0 || duration > 10) {
      alert("Course duration must be a positive number (max 10)");
      return;
    }

    if (isSemester) {
      if (!semesterCount) {
        alert("Semester count is required");
        return;
      }
      const sem = Number(semesterCount);
      if (Number.isNaN(sem) || sem < 1 || sem > 20) {
        alert("Semester count must be a positive integer");
        return;
      }
    }

    const payload = {
      courseName: name,
      courseDurationInYear: duration,
      isSemester: isSemester ? "yes" : "no",
      semesterCount: isSemester ? Number(semesterCount) : 0
    };

    try {
      setLoading(true);
      const res = await api.post(`/addCourseName`, payload);
      if (res.data?.success) {
        await fetchCourses();

        // reset form
        setCourseName("");
        setCourseDurationInYear("");
        setIsSemester(false);
        setSemesterCount("");
        setIsOpen(false);
      } else {
        alert(res.data?.message || "Failed to add course");
      }
    } catch (error) {
      console.error("POST Course Error:", error);
      const serverMsg = error?.response?.data?.message;
      alert(serverMsg || "Failed to add course");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (course) => {
    alert(`Edit course: ${course.courseName}`);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this course?")) return;

    try {
      const res = await api.delete(`/deleteCourseName/${id}`);
      if (res.data?.success || res.status === 200) {
        setCourses((prev) => prev.filter((course) => course._id !== id));
      } else {
        alert(res.data?.message || "Failed to delete course");
      }
    } catch (error) {
      console.error("Delete error:", error);
      const serverMsg = error?.response?.data?.message;
      alert(serverMsg || "Failed to delete course");
    }
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
                    placeholder="e.g. B.Tech / BCA / BBA"
                  />
                </label>

                <label className="block mb-4">
                  <span className="text-sm font-semibold text-slate-700 block mb-2">
                    Course Duration (Years)
                  </span>
                  <input
                    type="number"
                    autoFocus
                    value={courseDurationInYear}
                    onChange={(e) => setCourseDurationInYear(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 focus:outline-none transition-all placeholder:text-slate-400"
                    placeholder="e.g. 1 / 2 / 3"
                  />
                </label>

                <label className="block mb-4">
                  <span className="text-sm font-semibold text-slate-700 block mb-3">
                    Is Semester Based?
                  </span>

                  <div className="grid grid-cols-2 gap-4">
                    {/* NO */}
                    {/* NO */}
                    <label
                      className={`cursor-pointer rounded-xl border px-5 py-4 text-center transition-all
                      ${
                        !isSemester
                          ? "border-indigo-600 bg-indigo-50 ring-4 ring-indigo-500/10"
                          : "border-slate-200 hover:border-indigo-400"
                      }`}
                    >
                      <input
                        type="radio"
                        name="semester"
                        checked={!isSemester}
                        onChange={() => setIsSemester(false)}
                        className="hidden"
                      />
                      <span className="block text-sm font-semibold text-slate-700">
                        No
                      </span>
                      <span className="block text-xs text-slate-500 mt-1">
                        Annual / Non-semester
                      </span>
                    </label>

                    {/* YES */}
                    <label
                      className={`cursor-pointer rounded-xl border px-5 py-4 text-center transition-all
                      ${
                        isSemester
                          ? "border-indigo-600 bg-indigo-50 ring-4 ring-indigo-500/10"
                          : "border-slate-200 hover:border-indigo-400"
                      }`}
                    >
                      <input
                        type="radio"
                        name="semester"
                        checked={isSemester}
                        onChange={() => setIsSemester(true)}
                        className="hidden"
                      />
                      <span className="block text-sm font-semibold text-slate-700">
                        Yes
                      </span>
                      <span className="block text-xs text-slate-500 mt-1">
                        Semester-wise system
                      </span>
                    </label>
                  </div>
                </label>

                {isSemester && (
                  <label className="block mb-4">
                    <span className="text-sm font-semibold text-slate-700 block mb-2">
                      Number of Semesters
                    </span>
                    <input
                      type="number"
                      min={1}
                      autoFocus
                      value={semesterCount}
                      onChange={(e) => setSemesterCount(e.target.value)}
                      className="w-full rounded-xl border border-slate-200 px-4 py-3 focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 focus:outline-none transition-all placeholder:text-slate-400"
                      placeholder="e.g. 1 / 2 / 3 / 4 / 5 / 6 / 7 / 8"
                    />
                  </label>
                )}

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
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-indigo-50/50 border-b border-slate-200">
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">
                      S.No
                    </th>
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">
                      Course ID
                    </th>
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">
                      Course Name
                    </th>
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">
                      Duration
                    </th>
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">
                      Semesters
                    </th>
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">
                      Created At
                    </th>
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">
                      Updated At
                    </th>
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500 text-center">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-100">
                  {courses.length === 0 ? (
                    <tr>
                      <td colSpan="8" className="py-20 text-center">
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
                    paginatedCourses.filter(Boolean).map((course, index) => (
                      <tr
                        key={course._id}
                        className="group hover:bg-indigo-50/50 transition-colors"
                      >
                        <td className="px-6 py-4">
                          <span className="text-slate-800 font-mono text-sm">
                            {String(
                              (currentPage - 1) * ITEMS_PER_PAGE + index + 1
                            ).padStart(2, "0")}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-xs text-slate-800 font-mono mt-0.5">
                            {course._id}
                          </div>
                        </td>

                        <td className="px-6 py-4">
                          <div className=" text-slate-800">
                            {course.courseName}
                          </div>
                        </td>

                        <td className="px-6 py-4">
                          <div className=" text-slate-800">
                            {`${course.courseDurationInYear} Year`}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className=" text-slate-800">
                            {course.isSemester === "yes"
                              ? `${course.semesterArr?.length || 0} Semesters`
                              : "No Semester"}
                          </div>
                        </td>

                        <td className="px-6 py-4">
                          <div className="text-sm text-slate-800">
                            {isNaN(new Date(course.createdAt).getTime())
                              ? "—"
                              : new Date(course.createdAt).toLocaleDateString(
                                  undefined,
                                  {
                                    month: "short",
                                    day: "numeric",
                                    year: "numeric"
                                  }
                                )}
                          </div>
                        </td>

                        <td className="px-6 py-4">
                          <div className="text-[10px] text-slate-800 uppercase">
                            Updated{" "}
                            {isNaN(new Date(course.updatedAt).getTime())
                              ? "—"
                              : new Date(course.updatedAt).toLocaleTimeString(
                                  [],
                                  {
                                    hour: "2-digit",
                                    minute: "2-digit"
                                  }
                                )}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex justify-center gap-2">
                            <button
                              onClick={() => handleEdit(course)}
                              className="p-2 rounded-lg bg-white border border-slate-200 text-slate-800 hover:text-green-700 hover:border-indigo-200 hover:bg-green-100 transition-all shadow-sm"
                              title="Edit Course"
                            >
                              <FiEdit2 size={16} />
                            </button>
                            <button
                              onClick={() => handleDelete(course._id)}
                              className="p-2 rounded-lg bg-white border border-slate-200 text-slate-800 hover:text-red-600 hover:border-red-200 hover:bg-red-100 transition-all shadow-sm"
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
            <p className="text-xs text-slate-500 text-center font-medium">
              Showing {(currentPage - 1) * ITEMS_PER_PAGE + 1} -{" "}
              {Math.min(currentPage * ITEMS_PER_PAGE, courses.length)} of{" "}
              {courses.length} Courses
            </p>
          </div>

          {totalPages > 1 && (
            <div className="flex items-center justify-between border-t border-slate-200 px-6 py-4  bg-white">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => p - 1)}
                className="px-4 py-2 text-sm rounded-lg border disabled:opacity-50"
              >
                Previous
              </button>

              <div className="flex gap-2">
                {Array.from({ length: totalPages }).map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentPage(i + 1)}
                    className={`px-3 py-1 text-sm rounded-lg border ${
                      currentPage === i + 1
                        ? "bg-indigo-600 text-white border-indigo-600"
                        : "bg-white text-slate-600"
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>

              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((p) => p + 1)}
                className="px-4 py-2 text-sm rounded-lg border disabled:opacity-50"
              >
                Next
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseName;
