// import { IoArrowBack } from "react-icons/io5";
// import { useState, useEffect } from "react";
// import { useParams, useNavigate, Link } from "react-router-dom";
// import products from "../db/products";
// import Products from "../pages/Products";

// function FilterCategory() {
//   const navigate = useNavigate();
//   const { slug } = useParams();
//   // ambil kategori unik dari data produk
//   const uniqueCategories = [...new Set(products.map((p) => p.category))];

//   // tambahkan kategori "Semua" di awal
//   const categories = ["all", ...uniqueCategories];

//   // mapping kategori → icon
//   const categoryIcons = {
//     all: "🟢",
//     makanan: "🍜",
//     "daur ulang": "♻️",
//     dekorasi: "✨",
//     aksesoris: "💎",
//   };

//   // kategori aktif
//   const currentCategory = slug ? slug.replace(/-/g, " ") : "all";

//   // filter produk sesuai kategori aktif
//   const filteredProducts =
//     currentCategory === "all"
//       ? products
//       : products.filter((p) => p.category === currentCategory);

//   // navigasi kategori
//   const handleCategoryClick = (value) => {
//     navigate(`/category/${value.toLowerCase().replace(/\s+/g, "-")}`);
//   };

//   return (
//     <div className="px-3 sm:px-5 md:px-8 lg:px-[5.5rem] py-5 md:py-8 lg:py-10 transition-all duration-300">
//       {/* Tampilkan judul hanya di halaman utama */}
//       {!slug && (
//         <h1 className="font-bold text-base sm:text-lg md:text-xl mb-4 text-center sm:text-left">
//           Filter Berdasarkan Kategori
//         </h1>
//       )}

//       {/* Tombol kembali hanya di halaman kategori */}
//       {slug && (
//         <div className="mb-4">
//           <Link
//             to="/"
//             className="flex items-center gap-1.5 sm:gap-2 text-[#773FF9] hover:text-[#5a2cbb] transition text-sm sm:text-base"
//           >
//             <IoArrowBack className="text-lg sm:text-xl" />
//             <span className="hidden xs:inline">Kembali ke Home</span>
//           </Link>
//         </div>
//       )}

//       {/* Tombol kategori dinamis */}
//       <div className="flex flex-wrap justify-center sm:justify-start gap-2 sm:gap-3 mb-6">
//         {categories.map((cat, index) => (
//           <button
//             key={index}
//             onClick={() => handleCategoryClick(cat)}
//             className={`px-3 sm:px-4 md:px-5 py-1.5 sm:py-2 rounded-full border flex items-center justify-center gap-1 sm:gap-2 transition cursor-pointer text-xs sm:text-sm md:text-base font-medium ${
//               currentCategory === cat
//                 ? "bg-[#773FF9] text-white border-black shadow-md"
//                 : "bg-gray-100 text-gray-800 hover:bg-gray-200"
//             }`}
//           >
//             <span className="text-base sm:text-lg">
//               {categoryIcons[cat] || "📦"}
//             </span>
//             <span>
//               {cat === "all"
//                 ? "Semua"
//                 : cat.charAt(0).toUpperCase() + cat.slice(1)}
//             </span>
//           </button>
//         ))}
//       </div>

//       {/* Daftar produk */}
//       <div>
//         <Products products={filteredProducts} />
//       </div>
//     </div>
//   );
// }

// export default FilterCategory;

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
