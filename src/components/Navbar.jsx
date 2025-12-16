import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Input } from "./ui/input";
import { IoSearchSharp } from "react-icons/io5";
import { userStore } from "../state/state";

function Navbar() {
  const [query, setQuery] = useState(""); // menyimpan input pencarian
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim() === "") return; // kalau kosong, jangan cari
    navigate(`/search?q=${encodeURIComponent(query)}`);
    setQuery("");
  };

  const user = userStore((state) => state.currentUser);
  const logout = userStore((state) => state.logout);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="flex flex-row md:flex-row justify-between px-4 md:px-8 lg:px-30 py-4 md:py-[30px] items-center gap-4 md:gap-0">
      <Link to="/">
        <h1 className="font-bold text-[20px] md:text-[24px]">Rejo4Craft</h1>
      </Link>

      {/* Form pencarian */}
      <form onSubmit={handleSearch} className="relative w-full md:w-1/2">
        <IoSearchSharp
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#773FF9] cursor-pointer"
          onClick={handleSearch}
        />
        <Input
          type="text"
          placeholder="Cari Stok"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="pl-10 pr-20 py-2 w-full border rounded-md"
        />
        <button
          type="submit"
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-[#773FF9] text-white text-sm px-2 md:px-4 py-1 rounded-md hover:bg-[#5a2cbb] duration-300"
        >
          Cari
        </button>
      </form>

      {!user ? (
        <Link to="/login" className="w-full md:w-auto">
          <p className="bg-[#773FF9] text-white text-sm p-2 px-4 rounded-md hover:bg-[#5a2cbb] duration-300 text-center">
            Masuk
          </p>
        </Link>
      ) : (
        <div onClick={handleLogout} className="w-full md:w-auto">
          <p className="bg-[#FF0000] text-white text-sm p-2 px-4 rounded-md hover:bg-[#CC0000] duration-300 text-center">
            Keluar
          </p>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
