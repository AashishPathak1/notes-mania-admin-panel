

import Sidebar from "./Sidebar";
import Header from "./Header";

const PageWrapper = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />

      <div className="flex flex-1 flex-col">
        <Header />
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
};

export default PageWrapper;
