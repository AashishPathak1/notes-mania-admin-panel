const Header = () => {
  return (
    <header
      className="h-14 
          ml-16 peer-hover:ml-56
          transition-all duration-300
          bg-black px-20 flex items-center justify-between"
    >
      <h1 className="font-semibold text-white ">NotesMania</h1>
      <span className="text-sm text-gray-500">Admin/SuperAdmin</span>
    </header>
  );
};

export default Header;
