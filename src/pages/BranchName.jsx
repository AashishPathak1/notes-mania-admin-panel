import React, { useEffect, useState } from "react";
import axios from "axios";
import { FiBookOpen, FiPlus, FiX, FiEdit2, FiTrash2 } from "react-icons/fi";

const API_BASE = "https://bookmainabackend.onrender.com/api/M2";

const BranchName = () => {
  const ITEMS_PER_PAGE = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const [courseName, setCourseName] = useState([]);
  const [selectCourseID, setSelectCourseID] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [branchName, setBranchName] = useState("");
  const [branches, setBranches] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);

  const totalPages = Math.ceil(branches.length / ITEMS_PER_PAGE);
  const paginatedBranches = branches.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const fetchCourses = async () => {
    try {
      const response = await axios.get(`${API_BASE}/getAllCourseName`);
      if (response.data.data) {
        setCourseName(response.data.data);
      }
    } catch (error) {
      console.log("error in fetching course", error);
    }
  };

  const fetchBranches = async () => {
    try {
      const response = await axios.get(`${API_BASE}/getAllBranchName`);
      if (response.data.data) {
        setBranches(response.data.data);
      }
    } catch (error) {
      console.error("GET Branch Error", error);
    } finally {
      setPageLoading(false);
    }
  };

  // fetch branches ONCE
  useEffect(() => {
    fetchBranches();
  }, []);

  // fetch courses ONLY when modal opens
  useEffect(() => {
    if (isOpen) {
      fetchCourses();
    }
  }, [isOpen]);

  const handleSave = async () => {
    if (!branchName.trim()) {
      alert("Branch name is required");
      return;
    }

    try {
      setLoading(true);
      if (!selectCourseID) {
        alert("Course is required");
        return;
      }

      const payload = {
        branchName: [branchName],
        courseId: selectCourseID
      };

      const res = await axios.post(`${API_BASE}/addBranchName`, payload);

      if (res.data.success) {
        await fetchBranches();
        setBranchName("");
        setSelectCourseID("");
        setIsOpen(false);
      }
    } catch (error) {
      console.error("POST branch Error:", error);
      alert("Failed to add branch");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this branch?")) return;
    // alert(`this is the branch for ${id}`);

    try {
      await axios.delete(`${API_BASE}/deleteBranchName/${id}`);
      setBranches((prev) => prev.filter((branch) => branch._id !== id));
    } catch (error) {
      console.error("Error in HandleDelete", error);
    }
  };

  const handleEdit = (id) => {
    alert(`this is the branch for ${id}`);
  };
  return (
    <div className="w-full font-sans">
      <div className="w-full mx-auto">
        {/* Page Top Section Starts Here */}
        <div className="flex flex-col justify-between gap-4 mb-8 md:flex-row md:items-center">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 tracking-height">
              Branch Management
            </h1>
            <p className="text-slate-500 mt-1">
              Manage and Oragnise your educational Programs.
            </p>
          </div>

          <button
            className="flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-lg font-medium transition-all shadow-sm active:scale-95"
            onClick={() => {
              setIsOpen(true);
            }}
          >
            Add New Branch
            <FiPlus size={20} />
          </button>
        </div>{" "}
        {/* Page Top Section Ends here*/}
        {/*
         *******************************************
         */}
        {/* modal  Start Here*/}
        {isOpen && (
          <div className="fixed inset-0 z-50 p-4 flex items-center justify-center ">
            <div
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
              onClick={() => {
                setIsOpen(false);
              }}
            ></div>
            <div className="relative bg-white w-full max-w-md rounded-2xl shadow-2xl border border-slate-100 overflow-hidden transform transition-all">
              <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                <h2>Create New Branch</h2>
                <button
                  onClick={() => {
                    setIsOpen(false);
                  }}
                >
                  <FiX className="bg-red-500 rounded-full" size={20} />
                </button>
              </div>

              <div className="p-6">
                <div className="mb-6">
                  <label className="flex items-center gap-2 mb-2">
                    <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-indigo-100 text-indigo-600 text-xs font-bold">
                      1
                    </span>
                    <span className="text-sm font-semibold text-slate-700">
                      Course Name
                    </span>
                  </label>

                  <select
                    value={selectCourseID}
                    onChange={(e) => setSelectCourseID(e.target.value)}
                    className="w-full appearance-none rounded-xl border border-slate-300
                    px-4 py-3 bg-white
                    shadow-sm
                    hover:border-indigo-400
                    focus:ring-4 focus:ring-indigo-500/20
                    focus:border-indigo-500
                    focus:outline-none
                    transition-all"
                  >
                    <option value="">Select Course</option>
                    {courseName.map((course) => (
                      <option key={course._id} value={course._id}>
                        {course.courseName}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="mb-6">
                  <label className="flex items-center gap-2 mb-2">
                    <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-indigo-100 text-indigo-600 text-xs font-bold">
                      2
                    </span>
                    <span className="text-sm font-semibold text-slate-700">
                      Branch Name
                    </span>
                  </label>

                  <input
                    type="text"
                    value={branchName}
                    onChange={(e) => setBranchName(e.target.value)}
                    placeholder="e.g. AI / ML"
                    className="w-full rounded-xl border border-slate-300 px-4 py-3
                    shadow-sm
                  hover:border-indigo-400
                    focus:ring-4 focus:ring-indigo-500/20
                  focus:border-indigo-500
                    focus:outline-none
                    transition-all
                    placeholder:text-slate-400"
                  />
                </div>

                <div className="flex justify-end gap-3 mt-8">
                  <button
                    className="px-5 py-2.5 rounded-lg text-slate-600 font-medium hover:bg-slate-100 transition-colors"
                    onClick={() => {
                      setIsOpen(false);
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    className="px-6 py-2.5 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md shadow-indigo-200"
                    onClick={handleSave}
                    disabled={loading}
                  >
                    {loading ? "craeting..." : "Add Branch"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
        {/* Modal Ends Here*/}
        {/*
         *******************************************
         */}
        {/* Main Content Area Starts Here */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          {pageLoading ? (
            <div className="py-20 flex flex-col items-center justify-center space-y-4">
              <div className="w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
              <p className="text-slate-500 font-medium tracking-wide">
                Fetching branches...
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50/50 border-b border-slate-200">
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">
                      S.No
                    </th>
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">
                      Branch ID
                    </th>
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">
                      Course Name
                    </th>
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">
                      Branch Name
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
                  {branches.length === 0 ? (
                    <tr>
                      <td colSpan="7" className="py-20 text-center">
                        <div className="flex flex-col items-center justify-center text-slate-400">
                          <FiBookOpen
                            size={48}
                            className="mb-3 text-indigo-500  opacity-20"
                          />
                          <p className="text-lg font-medium text-slate-500">
                            No branchs found
                          </p>
                          <p className="text-sm">
                            Start by adding your first branch above.
                          </p>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    paginatedBranches.filter(Boolean).map((branch, index) => (
                      <tr
                        key={branch._id}
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
                            {branch._id}
                          </div>
                        </td>
                        {/* {branch.courseId?.courseName || "—"} */}
                        <td className="px-6 py-4">
                          <div className=" text-slate-800">
                            {branch.courseId?.courseName || "—"}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className=" text-slate-800">
                            {branch.branchName?.join(", ")}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-slate-800">
                            {new Date(branch.createdAt).toLocaleDateString(
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
                            {new Date(branch.updatedAt).toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit"
                            })}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex justify-center gap-2">
                            <button
                              onClick={() => handleEdit(branch)}
                              className="p-2 rounded-lg bg-white border border-slate-200 text-slate-800 hover:text-green-700 hover:border-indigo-200 hover:bg-green-100 transition-all shadow-sm"
                              title="Edit Course"
                            >
                              <FiEdit2 size={16} />
                            </button>
                            <button
                              onClick={() => handleDelete(branch._id)}
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
          {/*
           *******************************************
           */}
          <div className="px-6 py-4 bg-slate-50 border-t border-slate-200">
            <p className="text-xs text-slate-500 text-center font-medium">
              Showing {(currentPage - 1) * ITEMS_PER_PAGE + 1} -{" "}
              {Math.min(currentPage * ITEMS_PER_PAGE, branches.length)} of{" "}
              {branches.length} Branches
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
export default BranchName;
