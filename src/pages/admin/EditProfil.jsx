import React from "react";

export default function EditProfil() {
  return (
    <div className="bg-white w-full rounded-xl shadow-sm border border-gray-100 p-6">
      <h1 className="font-bold text-lg mb-4">Edit Profile</h1>

      <div className="flex items-center gap-8">
        {/* FOTO PROFIL (ANTI PEYANG) */}
        <div className="shrink-0 w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-md aspect-square">
          <img
            src="https://gerbangbanten.co.id/wp-content/uploads/2025/10/image-13.png"
            alt="Foto Profil"
            className="w-full h-full object-cover"
          />
        </div>

        {/* INFO UPLOAD */}
        <div className="space-y-1">
          <button className="border border-[#773FF9] px-4 py-2 rounded-xl hover:bg-gray-100 transition">
            Upload Foto Baru
          </button>

          <p className="text-sm text-gray-600">
            Min. <span className="font-semibold">800×800</span> px
          </p>

          <p className="text-sm text-gray-600">
            Format yang didukung:{" "}
            <span className="font-semibold">JPG / PNG</span>
          </p>
        </div>
      </div>

      <div className="flex gap-4 pt-4">
        <div className="flex flex-col gap-2">
          <label htmlFor="Nama">Nama</label>
          <input
            type="text"
            placeholder="Masukan Nama"
            className="border border-[#773FF9] rounded-sm p-1 w-32"
          ></input>
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="No Telpon">No Telpon</label>
          <input
            type="text"
            placeholder="Masukan No Telp"
            className="border border-[#773FF9] rounded-sm p-1 w-32"
          ></input>
        </div>
      </div>
      <div className="flex flex-col gap-1 mt-4">
        <label htmlFor="alamat">Alamat</label>
        <textarea
          id="alamat"
          placeholder="Masukkan Alamat"
          rows={3}
          className="border border-[#773FF9] rounded-md px-3 py-2 resize-none focus:outline-none focus:ring focus:ring-black/20"
        />
      </div>
      <button className="bg-[#773FF9] hover:bg-[#5a2cbb] duration-200 text-white mt-4 p-2 w-full rounded-sm">
        Simpan
      </button>
    </div>
  );
}
