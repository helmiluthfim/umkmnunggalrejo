import React, {useState, useEffect, useRef} from "react";
import { db } from "../../firebase";
import { getDocs, query, where, doc, collection, getDoc, updateDoc } from "firebase/firestore";
import axios from "axios";
import { userStore } from "../../state/state";

export default function EditProfil() {
  
  const user = userStore((state) => state.currentUser)
  const setUser = userStore((state) => state.setCurrentUser)
  const updateToko = (newToko) => {
    if(!user) return
    const updateUser = {
      ...user,
      toko: newToko
    }
  }

  const [data, setData] = useState({
    toko: "",
    no: "",
    alamat: "",
    userId: user.userId
  })
  const [image, setImage] = useState(null)

  const [loading, setLoading] = useState(true)
  
  const inputRef = useRef(null)

  const handleImgClick = () => {
    inputRef.current.click()
  } 

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (!file) return
    setImage(file)
  }

  const handleSubmit = async (e) => {
    updateToko(data.toko)
    e.preventDefault();

    const formData = new FormData();
    Object.keys(data).forEach((key) => {
      formData.append(key, data[key]);
    });
    if (image) {
      formData.append("image", image);
    }

    try {
      setLoading(true);
      await axios.post(
        "https://www.adismainbackend.xyz/adis/nunggalrejo/update",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      alert(`Produk berhasil ditambahkan`);
    } catch (err) {
      alert(err.response?.data?.error || err.message);
    } finally {
      setLoading(false);
      window.location.reload()
    }
  };

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  return (
    <div className="bg-white w-full rounded-xl shadow-sm border border-gray-100 p-6">
      <h1 className="font-bold text-lg mb-4">Edit Profile</h1>

      <div className="flex items-center gap-8">
        {/* FOTO PROFIL (ANTI PEYANG) */}
        <div className="shrink-0 w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-md aspect-square">
          <img
            src={user.imgUrl}
            alt="Foto Profil"
            className="w-full h-full object-cover"
          />
        </div>

        {/* INFO UPLOAD */}
        <div className="space-y-1">
          {image ?
            <div style={{display: 'flex', gap: "1rem", backgroundColor: "#773FF9", alignItems: "center"}} className="border border-[#773FF9] px-4 py-2 rounded-xl hover:bg-gray-100 transition">
              <img src={URL.createObjectURL(image)} alt="img" style={{maxWidth: "2rem", height: "2rem"}} /> 
              <p style={{color: "white"}}>Gambar Diterima!</p>
            </div> :
            <button onClick={handleImgClick} className="border border-[#773FF9] px-4 py-2 rounded-xl hover:bg-gray-100 transition">
              Upload Foto Baru
            </button>
          }
          <input
            type="file"
            accept="image/*"
            hidden
            ref={inputRef}
            onChange={handleFileChange}
          />

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
          <label htmlFor="Nama">Nama Toko</label>
          <input
            type="text"
            name="toko"
            placeholder="Masukan Nama Toko"
            className="border border-[#773FF9] rounded-sm p-1 w-32"
            onChange={handleChange}
            value={data.toko}
          ></input>
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="No Telpon">No Telpon</label>
          <div style={{display: "flex", gap: 8, alignContent: "center", alignItems: "center"}}>
            <p>+62</p>
            <input
              type="text"
              name="no"
              placeholder="Masukan No Telp"
              className="border border-[#773FF9] rounded-sm p-1 w-32"
              onChange={handleChange}
              value={data.no}
            ></input>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-1 mt-4">
        <label htmlFor="alamat">Alamat</label>
        <textarea
          id="alamat"
          name="alamat"
          placeholder="Masukkan Alamat"
          rows={3}
          className="border border-[#773FF9] rounded-md px-3 py-2 resize-none focus:outline-none focus:ring focus:ring-black/20"
          onChange={handleChange}
          value={data.alamat}
        />
      </div>
      <button onClick={handleSubmit} className="bg-[#773FF9] hover:bg-[#5a2cbb] duration-200 text-white mt-4 p-2 w-full rounded-sm">
        Simpan
      </button>
    </div>
  );
}
