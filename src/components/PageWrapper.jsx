import Sidebar from "./Sidebar";
import Header from "./Header";

const PageWrapper = ({ children }) => {
  return (
    <>
      <Sidebar />
      <Header />

      <main
        className="
          pt-10
          ml-16 peer-hover:ml-56
          transition-all duration-300
          min-h-screen bg-gray-100 p-10
        "
      >
        {children}
      </main>
    </>
  );
};

export default PageWrapper;
