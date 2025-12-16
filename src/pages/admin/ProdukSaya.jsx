import { useState, useEffect } from "react";
import axios from "axios";
import { db } from "../../firebase";
import {
  getDocs,
  deleteDoc,
  doc,
  query,
  where,
  collection,
} from "firebase/firestore";
import { userStore } from "../../state/state";

export default function ProdukSaya() {
  const user = userStore((state) => state.currentUser);
  const [product, setProduct] = useState([]);
  const [addProduct, setAddProduct] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const q = query(
          collection(db, "product"),
          where("toko", "==", user.toko)
        );
        const snapshot = await getDocs(q);
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProduct(data);
      } catch (err) {
        console.error(err.message);
      }
    };
    fetchData();
  }, [user.toko]);

  const truncateWords = (text, maxWords = 10) =>
    text.split(" ").slice(0, maxWords).join(" ") + "…";

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "product", id));
      setProduct((prev) => prev.filter((item) => item.id !== id));
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <>
      {/* ✅ PERBAIKAN 1: Mengirim props setAddProduct ke PopUp */}
      {addProduct && <PopUp user={user} setAddProduct={setAddProduct} />}

      <div
        className={`bg-white w-full rounded-xl shadow-sm border border-gray-100 overflow-hidden transition-opacity ${
          addProduct ? "opacity-50" : "opacity-100"
        }`}
        // Opsional: Klik background untuk menutup popup
        onClick={() => addProduct && setAddProduct(false)}
      >
        {/* Header */}
        <div className="p-6 border-b border-gray-100 flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-800">Produk Saya</h2>

          <button
            onClick={() => setAddProduct(true)}
            className="bg-violet-600 hover:bg-violet-700 transition text-white text-sm px-4 py-2 rounded-md"
          >
            Produk Baru
          </button>
        </div>

        {/* Product List */}
        <div className="flex flex-wrap gap-4 p-4">
          {product.map((item) => (
            <div
              key={item.id}
              className="w-full border border-gray-200 rounded-2xl p-6"
            >
              <div className="flex flex-col gap-4 lg:flex-row">
                <img
                  src={item.imgUrl}
                  alt={item.name}
                  className="w-full max-h-40 object-cover rounded-xl shadow-md"
                />

                <div className="flex flex-col gap-2">
                  <h3 className="font-bold text-gray-800">{item.name}</h3>

                  <p className="text-gray-700">
                    {truncateWords(item.description, 10)}
                  </p>

                  <p className="text-violet-600 font-semibold">
                    Rp {item.price}
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-4 pt-4">
                <button className="border border-violet-600 text-violet-600 rounded-md py-1 hover:bg-violet-600 hover:text-white transition">
                  Edit
                </button>

                <button
                  onClick={() => handleDelete(item.id)}
                  className="bg-red-600 hover:bg-red-700 transition text-white rounded-md py-1"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

//* ================= POPUP UPDATE ================= */

function PopUp({ user, setAddProduct }) {
  // 1. Definisikan kategori sesuai permintaan (tanpa 'Semua')
  const categoryList = [
    "🍜 Makanan",
    "♻️ Daur Ulang",
    "✨ Dekorasi",
    "💎 Aksesoris",
  ];

  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    nomor: user.no,
    minBuy: "",
    kondisi: "",
    toko: user.toko,
  });

  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    Object.keys(form).forEach((key) => {
      formData.append(key, form[key]);
    });
    formData.append("image", image);

    try {
      setLoading(true);
      await axios.post(
        "https://adis-main-backend.vercel.app/adis/nunggalrejo/product",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      alert(`Produk berhasil ditambahkan`);
      setAddProduct(false);
    } catch (err) {
      alert(err.response?.data?.error || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-20 flex items-center justify-center bg-black/40">
      <div
        className="bg-white rounded-2xl w-full max-w-2xl p-6 shadow-xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <h1 className="text-xl font-semibold mb-4 text-center">
          Tambah Produk
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Nama Produk"
            name="name"
            value={form.name}
            onChange={handleChange}
          />

          <Textarea
            label="Deskripsi"
            name="description"
            value={form.description}
            onChange={handleChange}
          />

          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Harga"
              name="price"
              type="number"
              value={form.price}
              onChange={handleChange}
            />

            {/* 👇 BAGIAN DROPDOWN KATEGORI BARU 👇 */}
            <div>
              <label className="block text-sm font-medium mb-1">Kategori</label>
              <div className="relative">
                <select
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                  required
                  className="w-full border rounded-lg p-2 appearance-none bg-white focus:outline-none focus:ring focus:ring-black/20"
                >
                  <option value="" disabled>
                    Pilih Kategori
                  </option>
                  {categoryList.map((item, index) => {
                    // Kita hapus emoji agar yang masuk DB hanya teks (misal: "Makanan")
                    // Agar cocok dengan logic filter: item.kategori === selectedCategory.replace(...)
                    const cleanValue = item.replace(/^\S+\s/, "");

                    return (
                      <option key={index} value={cleanValue}>
                        {item}
                      </option>
                    );
                  })}
                </select>
                {/* Icon panah dropdown custom agar lebih rapi */}
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg
                    className="fill-current h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                </div>
              </div>
            </div>
            {/* 👆 END BAGIAN DROPDOWN 👆 */}
          </div>

          <div className="grid grid-cols-3 gap-4">
            <Input
              label="Nomor"
              name="nomor"
              value={form.nomor}
              onChange={handleChange}
              readOnly // Biasanya nomor otomatis dari user, jadi readOnly
            />
            <Input
              label="Min. Beli"
              name="minBuy"
              type="number"
              value={form.minBuy}
              onChange={handleChange}
            />
            <Input
              label="Kondisi"
              name="kondisi"
              value={form.kondisi}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Gambar</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
              className="w-full border rounded-lg p-2"
              required
            />
          </div>

          {/* ACTION BUTTON */}
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={() => setAddProduct(false)}
              className="w-1/2 border border-gray-300 py-2 rounded-lg hover:bg-gray-100 transition"
            >
              Cancel
            </button>

            <button
              disabled={loading}
              className="w-1/2 bg-black text-white py-2 rounded-lg hover:bg-gray-800 disabled:opacity-50"
            >
              {loading ? "Uploading..." : "Simpan Produk"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

/* ================= INPUT COMPONENT ================= */

function Input({ label, ...props }) {
  return (
    <div>
      <label className="block text-sm font-medium mb-1">{label}</label>
      <input
        {...props}
        className="w-full border rounded-lg p-2 focus:outline-none focus:ring focus:ring-black/20"
      />
    </div>
  );
}

function Textarea({ label, ...props }) {
  return (
    <div>
      <label className="block text-sm font-medium mb-1">{label}</label>
      <textarea
        {...props}
        rows={3}
        className="w-full border rounded-lg p-2 focus:outline-none focus:ring focus:ring-black/20"
      />
    </div>
  );
}
