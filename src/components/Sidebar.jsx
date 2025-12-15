import { Link, useLocation } from "react-router-dom";

// eslint-disable-next-line react/prop-types
export default function Sidebar({ closeMobileMenu }) {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  // Class helper untuk item menu
  const getLinkClass = (path) => `
    flex items-center text-sm px-4 py-3 mb-1 rounded-lg transition-colors duration-200
    ${
      isActive(path)
        ? "bg-[#773FF9] text-white shadow-md"
        : "text-slate-800 hover:bg-[#773FF9] hover:text-white"
    }
  `;

  return (
    <div className="h-full w-50 lg:h-58 flex flex-col p-4 overflow-y-auto lg:border rounded-2xl">
      <nav className="flex-1">
        <div className="mb-2 px-4 text-xs font-light text-slate-500 tracking-wider">
          Produk
        </div>
        <Link
          to="/admin"
          className={getLinkClass("/admin")}
          onClick={closeMobileMenu}
        >
          Produk Saya
        </Link>

        <div className="mb-2 px-4 text-xs font-light text-slate-500 tracking-wider">
          Pengaturan Akun
        </div>
        <Link
          to="edit-profile"
          className={getLinkClass("/admin/edit-profile")}
          onClick={closeMobileMenu}
        >
          Edit Profil
        </Link>
        <Link
          to="change-password"
          className={getLinkClass("/admin/change-password")}
          onClick={closeMobileMenu}
        >
          Ganti Password
        </Link>
      </nav>

      <Link
        to="/"
        className="flex items-center px-4 py-2 text-red-400 hover:bg-slate-800 hover:text-red-300 rounded-lg transition-colors lg:hidden"
      >
        Keluar
      </Link>
    </div>
  );
}
