import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { db } from "../../firebase";
import {
  getDoc,
  getDocs,
  addDoc,
  deleteDoc,
  query,
  where,
  collection,
} from "firebase/firestore";

import { userStore } from "../../state/state";
import styles from "./produksaya.module.css";

export default function ProdukSaya() {
  const user = userStore((state) => state.currentUser);
  const [product, setProduct] = useState([]);
  const [addProduct, setAddProduct] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const q = query(
          collection(db, "product"),
          where("toko", "==", user.toko),
        );
        const querySnapshot = await getDocs(q);
        const data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProduct(data);
      } catch (err) {
        console.error(err.message);
      }
    };
    fetchData();
  });

  const truncateWords = (text, maxWords = 10) => {
    return text.split(" ").slice(0, maxWords).join(" ") + "…";
  };

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "product", id));
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <>
      {addProduct ? <PopUp user={user} /> : null}
      <div
        className={styles.container}
        style={{ opacity: addProduct ? 0.5 : 1 }}
        onClick={() => (addProduct ? setAddProduct(false) : null)}
      >
        <div className={styles.header}>
          <h2 className={styles.title}>Produk Saya</h2>

          <div className={styles.link} onClick={() => setAddProduct(true)}>
            <p className={styles.newProductBtn}>Produk Baru</p>
          </div>
        </div>

        <div className={styles.productContainer}>
          {product.map((item) => (
            <div key={item.id} className={styles.card}>
              <div className={styles.cardContent}>
                <img
                  src={item.imgUrl}
                  className={styles.image}
                  alt={item.name}
                />

                <div className={styles.info}>
                  <h3 className={styles.productName}>{item.name}</h3>
                  <p className={styles.description}>
                    {truncateWords(item.description, 10)}
                  </p>
                  <p className={styles.price}>Rp {item.price}</p>
                </div>
              </div>

              <div className={styles.actions}>
                <button className={styles.editBtn}>Edit</button>

                <button
                  onClick={() => handleDelete(item.id)}
                  className={styles.deleteBtn}
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

function PopUp({user}) {
  const [form, setForm] = useState({
    name: "",
    desc: "",
    price: "",
    category: "",
    nomor: user.no,
    minBuy: "",
    kondisi: "",
  });
  const [image, setImage] = useState(null);

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
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
        "http://localhost:5000/adis/nunggalrejo/products",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } },
      );
      alert("Produk berhasil ditambahkan");
    } catch (err) {
      console.log(err.response?.data || err.message);
      alert(err.response?.data?.error || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 bg-white border border-gray-400 rounded-2xl w-1/2 h-1/2 p-4 shadow-[0px_4px_10px_rgba(0,0,0,0.5)] flex flex-col gap-4 max-w-2xl mx-auto">
        <h1 className="text-xl font-semibold mb-4">Tambah Produk</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Nama Produk"
            name="name"
            value={form.name}
            onChange={handleChange}
          />
          <Textarea
            label="Deskripsi"
            name="desc"
            value={form.desc}
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
            <Input
              label="Kategori"
              name="category"
              value={form.category}
              onChange={handleChange}
            />
          </div>

          <div className="grid grid-cols-3 gap-4">
            <Input
              label="Nomor"
              name="nomor"
              value={form.nomor}
              onChange={handleChange}
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

          <button
            disabled={loading}
            className="w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800 disabled:opacity-50"
          >
            {loading ? "Uploading..." : "Simpan Produk"}
          </button>
        </form>
      </div>
    </>
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
