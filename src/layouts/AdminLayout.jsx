import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import Sidebar from "../components/Sidebar";
import { userStore } from "../state/state";

function AdminLayout() {
  const [isSidebarOpen, setSidebarOpen] = useState();
  const user = userStore((state) => state.currentUser);

  return (
    <div className="p-4 px-2 md:px-8 lg:px-2 gap-8 md:gap-4">
      <div className="py-6 lg:py-10">
        <div className="flex px-4 lg:px-4 flex-row md:flex-row justify-between pb-10 items-center  ">
          <h1 className="font-semibold text-2xl">
            Selamat Datang, <span className="text-[#773FF9]">{user.toko}!</span>
          </h1>
          <Link to="/" className="w-30 md:w-auto hidden lg:block">
            <p className="bg-[#FF0909] flex justify-center text-white text-sm p-2 px-4 rounded-md hover:bg-[#e91212] duration-300">
              Keluar
            </p>
          </Link>
        </div>

        <main className="flex flex-col lg:flex-row gap-4">
          {isSidebarOpen && (
            <div
              className="fixed inset-0 z-20 bg-slate-200 border bg-opacity-50 lg:hidden"
              onClick={() => setSidebarOpen(false)}
            ></div>
          )}

          <div
            className={`
                fixed inset-y-0 left-0 z-30 w-64  text-slate-800 transition-transform duration-300 ease-in-out
                lg:translate-x-0 lg:static lg:inset-0
                ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
              `}
          >
            <Sidebar closeMobileMenu={() => setSidebarOpen(false)} />
          </div>

          <header className="flex items-center justify-between bg-white  lg:hidden">
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-2 rounded-md bg-gray-100 text-gray-600 hover:bg-gray-200 focus:outline-none"
            >
              {/* Icon Hamburger Sederhana */}
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </button>
          </header>

          <Outlet />
        </main>
      </div>

      <Footer />
    </div>
  );
}

export default AdminLayout;
