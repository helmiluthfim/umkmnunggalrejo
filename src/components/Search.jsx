// import { Link, useLocation } from "react-router-dom";
// import products from "../db/products";
// import Products from "../pages/Products";
// import { IoArrowBack } from "react-icons/io5";

// function SearchPage() {
//   const { search } = useLocation();
//   const query = new URLSearchParams(search).get("q")?.toLowerCase() || "";

//   // Filter produk berdasarkan kata kunci
//   const filteredProducts = products.filter(
//     (item) =>
//       (item.name || "").toLowerCase().includes(query) ||
//       (item.category || "").toLowerCase().includes(query) ||
//       (item.toko || "").toLowerCase().includes(query),
//   );

//   return (
//     <div className="px-4 sm:px-6 md:px-10 py-8 md:py-12 max-w-7xl mx-auto">
//       {/* Tombol kembali */}
//       <Link
//         to="/"
//         className="flex items-center gap-2 text-[#773FF9] hover:text-[#5a2cbb] transition text-sm sm:text-base mb-6"
//       >
//         <IoArrowBack className="text-lg sm:text-xl" />
//         Kembali ke Home
//       </Link>

//       {/* Judul hasil pencarian */}
//       <h2 className="text-lg sm:text-xl md:text-2xl font-semibold mb-6">
//         Hasil pencarian untuk:{" "}
//         <span className="text-[#773FF9] break-words">"{query}"</span>
//       </h2>

//       {/* Daftar hasil pencarian */}
//       {filteredProducts.length > 0 ? (
//         <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 sm:gap-6 md:gap-8">
//           <Products products={filteredProducts} />
//         </div>
//       ) : (
//         <p className="text-gray-500 text-sm sm:text-base md:text-lg mt-6">
//           Tidak ada produk yang cocok dengan pencarian kamu.
//         </p>
//       )}
//     </div>
//   );
// }

// export default SearchPage;

import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { db } from "../firebase";
import { getDocs, collection, query, where } from "firebase/firestore";

import { IoArrowBack } from "react-icons/io5";
import Products from "../pages/Products";

export default function SearchPage() {
  const [products, setProducts] = useState([]);
  const { search } = useLocation();
  const find = new URLSearchParams(search).get("q")?.toLowerCase() || "";

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (find.trim() === "") return;

        const q = query(
          collection(db, "product"),
          where("nameLower", ">=", find),
          where("nameLower", "<=", find + "\uf8ff")
        );

        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          const results = querySnapshot.docs.map(doc => doc.data());
          setProducts(results);
        } else {
          setProducts([]);
        }
      } catch (err) {
        console.error(err.message);
      }
    };

    fetchData();
  }, [find]);

  return (
    <>
    <div className="px-4 sm:px-6 md:px-10 py-8 md:py-12 max-w-7xl mx-auto">
      {/* Tombol kembali */}
      <Link
        to="/"
        className="flex items-center gap-2 text-[#773FF9] hover:text-[#5a2cbb] transition text-sm sm:text-base mb-6"
      >
        <IoArrowBack className="text-lg sm:text-xl" />
        Kembali ke Home
      </Link>

      {/* Judul hasil pencarian */}
      <h2 className="text-lg sm:text-xl md:text-2xl font-semibold mb-6">
        Hasil pencarian untuk:{" "}
        <span className="text-[#773FF9] break-words">"{find}"</span>
      </h2>

      {/* Daftar hasil pencarian */}
      {products.length > 0 ? (
        <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 sm:gap-6 md:gap-8">
          <Products products={products} />
        </div>
      ) : (
        <p className="text-gray-500 text-sm sm:text-base md:text-lg mt-6">
          Tidak ada produk yang cocok dengan pencarian kamu.
        </p>
      )}
    </div>
    </>
  );
}