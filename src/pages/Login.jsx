import React from "react";
import { Label } from "../components/ui/label";
import { Input } from "../components/ui/input";

function Login() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
      <div className="bg-white shadow-lg rounded-2xl w-full max-w-sm p-8">
        <h1 className="text-2xl font-bold text-center text-[#773FF9] mb-6">
          Masuk Akun
        </h1>

        <div className="space-y-5">
          <div>
            <Label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email
            </Label>
            <Input
              type="email"
              id="email"
              placeholder="Masukkan email kamu"
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#773FF9]"
            />
          </div>

          <div>
            <Label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Kata Sandi
            </Label>
            <Input
              type="password"
              id="password"
              placeholder="Masukkan kata sandi"
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#773FF9]"
            />
          </div>

          <button
            type="button"
            className="w-full bg-[#773FF9] text-white font-semibold py-2 rounded-md hover:bg-[#5a2cbb] transition-all duration-300"
          >
            Masuk
          </button>
        </div>

        <p className="text-center text-sm text-gray-500 mt-6">
          Belum punya akun?{" "}
          <span className="text-[#773FF9] hover:text-[#5a2cbb] font-medium cursor-pointer">
            Daftar Sekarang
          </span>
        </p>
      </div>
    </div>
  );
}

export default Login;
