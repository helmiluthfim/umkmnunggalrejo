import { useState, useEffect } from "react";
import { getDocs, collection, doc } from "firebase/firestore";
import { db } from "../firebase";
import { useParams, useNavigate, Link } from "react-router-dom";

import styles from "./filterCategory.module.css";
import Products from "../pages/Products";

export default function FilterCategory() {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("🟢 Semua");

  const navigate = useNavigate();
  const { slug } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const snap = await getDocs(collection(db, "product"));
        const data = snap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setProducts(data);
      } catch (err) {
        console.error(err.message);
      }
    };
    fetchData();
  }, []);

  const category = [
    "🟢 Semua",
    "🍜 Makanan",
    "♻️ Daur Ulang",
    "✨ Dekorasi",
    "💎 Aksesoris",
  ];

  const filtered =
    selectedCategory === "🟢 Semua"
      ? products
      : products.filter(
          (item) => item.kategori === selectedCategory.replace(/^\S+\s/, ""),
        );

  return (
    <>
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <p className={styles.subTitle}>Filter berdasarkan kategori</p>
          <div className={styles.filterButtonWrapper}>
            {category.map((item, index) => (
              <div
                key={index}
                onClick={() => setSelectedCategory(item)}
                className={`${styles.filterButton} ${selectedCategory == item ? styles.active : styles.filterButton}`}
              >
                {item}
              </div>
            ))}
          </div>
        </div>
        <Products products={filtered} />
      </div>
    </>
  );
}
