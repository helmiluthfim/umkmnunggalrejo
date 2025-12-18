import React from "react";

export default function ChangePassword() {
  return (
    <div className="bg-white w-full rounded-xl shadow-sm border border-gray-100 p-6">
      <h1 className="font-bold text-lg mb-4">Ganti Kata Sandi</h1>

      <div className="flex flex-col gap-1 mt-4">
        <label htmlFor="alamat">Masukan kata sandi lama anda</label>
        <textarea
          id="alamat"
          placeholder="Masukkan Kata Sandi Lama"
          rows={3}
          className="border border-[#773FF9] rounded-md px-3 py-1 h-8 flex items-center justify-center resize-none focus:outline-none focus:ring focus:ring-black/20"
        />
      </div>
      <div className="flex flex-col gap-1 mt-4">
        <label htmlFor="alamat">Buat kata sandi baru</label>
        <textarea
          id="alamat"
          placeholder="Masukkan Kata Sandi Baru"
          rows={3}
          className="border border-[#773FF9] rounded-md px-3 py-1 h-8 flex items-center justify-center resize-none focus:outline-none focus:ring focus:ring-black/20"
        />
      </div>
      <div className="flex flex-col gap-1 mt-4">
        <label htmlFor="alamat">Ulangi kata sandi baru</label>
        <textarea
          id="alamat"
          placeholder="Ulangi Kata Sandi Baru"
          rows={3}
          className="border border-[#773FF9] rounded-md px-3 py-1 h-8 flex items-center justify-center resize-none focus:outline-none focus:ring focus:ring-black/20"
        />
      </div>
      <button className="bg-[#773FF9] hover:bg-[#5a2cbb] duration-200 text-white mt-4 p-2 w-full rounded-sm">
        Simpan
      </button>
    </div>
  );
}
