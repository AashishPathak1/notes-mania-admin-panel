import React, { useEffect, useState } from "react";
import axios from "axios";
import { FiBookOpen, FiPlus, FiX } from "react-icons/fi";
const API_BASE = "";

const BranchName = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [branchName, setBranchName] = useState("");
  const [branches, setBranches] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);

  const fetchBranches = async () => {
    try {
      const response = await axios.get(`${API_BASE}/getAllBranches`);
      if (response.data.data) {
        setBranches(response.data.data);
      }
    } catch (error) {
      console.error("GET Branch Error", error);
    } finally {
      setPageLoading(false);
    }
  };

  useEffect(() => {
    fetchBranches();
  }, []);

  const handleSave = async () => {
    if (!branchName.trim()) {
      alert("branch name is required");
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post(`${API_BASE}/addbranchName`, { branchName });

      if (res.data.success) {
        setBranches((prev) => [...prev, res.data.data]);
        setBranchName("");
        setIsOpen(false);
      }
    } catch (error) {
      console.error("POST branch Error:", error);
      alert("Failed to add branch");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = (branch) => {
    alert(`this is the branch for ${branch}`);
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
                <label className="block mb-4">
                  <span className="text-sm font-semibold text-slate-700 block mb-2">
                    Branch Name
                  </span>
                  <input
                    type="text"
                    autoFocus
                    value={branchName}
                    onChange={(e) => setBranchName(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 focus:outline-none transition-all placeholder:text-slate-400"
                    placeholder="e.g. AI / ML"
                  />
                </label>

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
        <div>
          {pageLoading ? (
            <div className="py-20 flex flex-col items-center justify-center space-y-4">
              <div className="w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
              <p className="text-slate-500 font-medium tracking-wide">
                Fetching branchs...
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
                      <td colSpan="6" className="py-20 text-center">
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
                    branches.map((branch, index) => (
                      <tr
                        key={branch._id}
                        className="group hover:bg-indigo-50/50 transition-colors"
                      >
                        <td className="px-6 py-4">
                          <span className="text-slate-800 font-mono text-sm">
                            {String(index + 1).padStart(2, "0")}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-xs text-slate-800 font-mono mt-0.5">
                            {branch._id}
                          </div>
                        </td>

                        <td className="px-6 py-4">
                          <div className=" text-slate-800">
                            {branch.courseName}
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
            <p className="text-xs text-slate-500 font-medium">
              Showing {branches.length} total branchs
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default BranchName;
