import { useState, useEffect } from "react";
import axios from "axios";
import { db } from "../../firebase";
import {
  getDocs,
  deleteDoc,
  updateDoc, // ✅ Tambahkan updateDoc
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

  // ✅ STATE UNTUK EDIT INLINE
  const [editingId, setEditingId] = useState(null); // ID produk yang sedang diedit
  const [editData, setEditData] = useState({}); // Data sementara saat mengetik

  useEffect(() => {
    const fetchData = async () => {
      try {
        const q = query(
          collection(db, "product"),
          where("userId", "==", user.userId)
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

  // const truncateWords = (text, maxWords = 10) => {
  //   if (!text) return "";
  //   return (
  //     text.split(" ").slice(0, maxWords).join(" ") +
  //     (text.split(" ").length > maxWords ? "…" : "")
  //   );
  // };

  const truncateWords = (text, maxChars = 50) => {
    if (!text) return "";
    return text.length <= maxChars ? text : text.slice(0, maxChars) + "...";
  };


  const handleDeleteProduct = async (productId) => {
    if (!window.confirm("Apakah kamu yakin ingin menghapus produk ini?"))
      return;

    try {
      const response = await axios.delete(
        `https://www.adismainbackend.xyz/adis/nunggalrejo/product/${productId}`
      );

      console.log("Delete success:", response.data);
      alert("Produk berhasil dihapus!");

      // Jika pakai state untuk list produk, update state setelah delete
      // setProducts(products.filter(p => p.id !== productId));
    } catch (err) {
      console.error(
        "Gagal menghapus produk:",
        err.response?.data || err.message
      );
      alert(err.message);
    } finally {
      window.location.reload();
    }
  };

  // ✅ FUNGSI MULAI EDIT
  const handleEditClick = (item) => {
    setEditingId(item.id);
    setEditData(item); // Masukkan data item saat ini ke form sementara
  };

  // ✅ FUNGSI BATAL EDIT
  const handleCancelEdit = () => {
    setEditingId(null);
    setEditData({});
  };

  // ✅ FUNGSI HANDLE PERUBAHAN INPUT
  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditData((prev) => ({ ...prev, [name]: value }));
  };

  const slugify = (text) => text?.toLowerCase().replace(/\s+/g, "-") || "";
  // ✅ FUNGSI SIMPAN PERUBAHAN (UPDATE)
  const handleSaveEdit = async (kategori, id) => {
    try {
      // Update ke Firebase
      const docRef = doc(db, "product", id);
      await updateDoc(docRef, {
        name: editData.name,
        description: editData.description,
        price: editData.price,
        slug: slugify(`/${kategori}/${user.toko}/${editData.name}`, {
          lower: true,
          strict: true,
        }),
      });

      // Update State Lokal (agar UI berubah tanpa refresh)
      setProduct((prev) =>
        prev.map((item) => (item.id === id ? { ...item, ...editData } : item))
      );

      setEditingId(null); // Keluar mode edit
    } catch (err) {
      console.error("Gagal update:", err.message);
      alert(err.message);
    }
  };

  return (
    <>
      {addProduct && <PopUp user={user} setAddProduct={setAddProduct} />}

      <div
        className={`bg-white w-full rounded-xl shadow-sm border border-gray-100 overflow-hidden transition-opacity ${
          addProduct ? "opacity-50" : "opacity-100"
        }`}
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
          {product.map((item) => {
            const isEditing = editingId === item.id;

            return (
              <div
                key={item.id}
                className={`w-full border rounded-2xl p-6 transition-all ${
                  isEditing
                    ? "border-violet-500 bg-violet-50"
                    : "border-gray-200"
                }`}
              >
                <div className="flex flex-col gap-4 lg:flex-row">
                  {/* Gambar (Tidak diedit inline agar simpel) */}
                  <img
                    src={item.imgUrl}
                    alt={item.name}
                    className="w-full lg:w-40 h-40 object-cover rounded-xl shadow-md shrink-0"
                  />

                  {/* KONTEN: Toggle antara View Mode vs Edit Mode */}
                  <div className="flex flex-col gap-2 w-full">
                    {isEditing ? (
                      /* --- MODE EDIT --- */
                      <div className="flex flex-col gap-3">
                        <div>
                          <label className="text-xs font-bold text-gray-500">
                            Nama Produk
                          </label>
                          <input
                            type="text"
                            name="name"
                            value={editData.name}
                            onChange={handleEditChange}
                            className="w-full border border-gray-300 rounded px-2 py-1 focus:outline-violet-500"
                          />
                        </div>

                        <div>
                          <label className="text-xs font-bold text-gray-500">
                            Deskripsi
                          </label>
                          <textarea
                            name="description"
                            rows={2}
                            value={editData.description}
                            onChange={handleEditChange}
                            className="w-full border border-gray-300 rounded px-2 py-1 focus:outline-violet-500 text-sm"
                          />
                        </div>

                        <div>
                          <label className="text-xs font-bold text-gray-500">
                            Harga (Rp)
                          </label>
                          <input
                            type="number"
                            name="price"
                            value={editData.price}
                            onChange={handleEditChange}
                            className="w-full border border-gray-300 rounded px-2 py-1 focus:outline-violet-500"
                          />
                        </div>
                      </div>
                    ) : (
                      /* --- MODE VIEW (TAMPILAN BIASA) --- */
                      <>
                        <h3 className="font-bold text-gray-800 text-lg">
                          {item.name}
                        </h3>
                        <p className="text-gray-600 text-sm">
                          {truncateWords(item.description, 50)}
                        </p>
                        <p className="text-violet-600 font-bold text-lg">
                          Rp {parseInt(item.price).toLocaleString("id-ID")}
                        </p>
                      </>
                    )}
                  </div>
                </div>

                {/* TOMBOL AKSI */}
                <div className="flex gap-3 pt-4 mt-2 border-t border-gray-100">
                  {isEditing ? (
                    /* Tombol saat Mode Edit */
                    <>
                      <button
                        onClick={() => handleSaveEdit(item.kategori, item.id)}
                        className="bg-green-600 text-white px-4 py-1.5 rounded-md hover:bg-green-700 text-sm transition"
                      >
                        Simpan
                      </button>
                      <button
                        onClick={handleCancelEdit}
                        className="bg-gray-400 text-white px-4 py-1.5 rounded-md hover:bg-gray-500 text-sm transition"
                      >
                        Batal
                      </button>
                    </>
                  ) : (
                    /* Tombol saat Mode Biasa */
                    <>
                      <button
                        onClick={() => handleEditClick(item)}
                        className="border border-violet-600 text-violet-600 rounded-md px-4 py-1.5 hover:bg-violet-600 hover:text-white transition text-sm"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteProduct(item.id)}
                        className="bg-red-50 text-red-600 border border-red-200 hover:bg-red-600 hover:text-white transition rounded-md px-4 py-1.5 text-sm"
                      >
                        Delete
                      </button>
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

// ... Bagian PopUp dan Input Component dibiarkan sama seperti kode asli ...
// ... Copy bagian PopUp dan Component Input dari kode sebelumnya di sini ...

//* ================= POPUP UPDATE ================= */
// (Kode PopUp dan Input di bawah ini sama persis dengan kode Anda sebelumnya,
//  saya sertakan agar tidak error saat di-copy paste)

function PopUp({ user, setAddProduct }) {
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
    kategori: "",
    nomor: user.no,
    minBuy: 0,
    kondisi: "",
    toko: user.toko,
    userId: user.userId
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
        "https://www.adismainbackend.xyz/adis/nunggalrejo/product",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      alert(`Produk berhasil ditambahkan`);
      setAddProduct(false);
    } catch (err) {
      alert(err.response?.data?.error || err.message);
    } finally {
      setLoading(false);
      window.location.reload();
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
            <div>
              <label className="block text-sm font-medium mb-1">Kategori</label>
              <div className="relative">
                <select
                  name="kategori"
                  value={form.kategori}
                  onChange={(e) =>
                    setForm({ ...form, kategori: e.target.value })
                  }
                  required
                  className="w-full border rounded-lg p-2 appearance-none bg-white focus:outline-none focus:ring focus:ring-black/20"
                >
                  <option value="" disabled>
                    Pilih Kategori
                  </option>

                  {categoryList.map((item, index) => {
                    const cleanValue = item.replace(/^\S+\s/, "");
                    return (
                      <option key={index} value={cleanValue}>
                        {item}
                      </option>
                    );
                  })}
                </select>
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
          </div>

          <div className="grid grid-cols-3 gap-4">
            <Input
              label="Nomor"
              name="nomor"
              disabled={true}
              value={form.nomor}
              onChange={handleChange}
              readOnly
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
