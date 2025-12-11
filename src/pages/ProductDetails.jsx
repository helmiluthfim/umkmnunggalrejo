// import { useParams, Link } from "react-router-dom";
// import { IoArrowBack, IoLogoWhatsapp } from "react-icons/io5";
// import products from "../db/products";
// import { useState } from "react";

// function ProductDetail() {
//   const { category, slug } = useParams();
//   const [count, setCount] = useState(0);

//   function handlerCountSum(action) {
//     if (action === "increment") {
//       setCount(count + 1);
//     } else if (action === "decrement" && count > 0) {
//       setCount(count - 1);
//     }
//   }

//   const product = products.find(
//     (p) =>
//       (p.category || "").toLowerCase().replace(/\s+/g, "-") === category &&
//       (p.name || "").toLowerCase().replace(/\s+/g, "-") === slug,
//   );

//   if (!product) {
//     return (
//       <div className="p-10 text-center text-gray-500">
//         <p>Produk tidak ditemukan 😢</p>
//         <Link to="/" className="text-[#773FF9] hover:underline">
//           Kembali ke Beranda
//         </Link>
//       </div>
//     );
//   }

//   return (
//     <div className="px-4 md:px-20 py-10">
//       <Link
//         to={`/category/${category}`}
//         className="flex items-center gap-2 text-[#773FF9] hover:text-[#5a2cbb] transition mb-6"
//       >
//         <IoArrowBack />
//         Kembali ke {category.charAt(0).toUpperCase() + category.slice(1)}
//       </Link>

//       <div className="flex flex-col lg:flex-row gap-8">
//         {/* Gambar Produk */}
//         <img
//           src={product.imgUrl}
//           alt={product.name}
//           className="w-full sm:w-72 h-60 object-cover rounded-lg shadow-md"
//         />

//         {/* Detail Produk */}
//         <div className="flex-1">
//           <h1 className="text-2xl font-bold mb-2">{product.name}</h1>
//           <p className="text-gray-500 mb-2">{product.toko}</p>
//           <p className="text-[#773FF9] font-bold text-xl mb-4">
//             Rp {product.price.toLocaleString("id-ID")}
//           </p>

//           <div className="mb-4 border-b-2 border-[#773FF9] pb-2">
//             <p className="font-bold text-lg">Detail Produk</p>
//           </div>

//           <div className="pb-4">
//             <p>
//               Kondisi: <span className="font-bold">{product.kondisi}</span>
//             </p>
//             <p>
//               Min. Pemesanan:{" "}
//               <span className="font-bold">{product.minBuy}</span>
//             </p>
//           </div>

//           <p className="text-gray-700 leading-relaxed">
//             {product.description || "Deskripsi produk belum tersedia."}
//           </p>
//         </div>

//         {/* Card kanan (jumlah dan WA) */}
//         <div className="border border-gray-300 rounded-md w-full lg:w-80 p-4 flex flex-col gap-4 shadow-sm">
//           <h1 className="font-bold pb-2 border-b">Atur Jumlah & Catatan</h1>

//           <div>
//             <p className="mb-2">Jumlah</p>
//             <div className="flex items-center gap-4 border rounded-md px-2 py-1 w-fit">
//               <button
//                 onClick={() => handlerCountSum("decrement")}
//                 disabled={count === 0}
//                 className={`w-6 h-6 flex items-center justify-center rounded-md ${
//                   count === 0
//                     ? "cursor-not-allowed text-gray-400"
//                     : "text-[#773FF9]"
//                 }`}
//               >
//                 -
//               </button>
//               <div className="min-w-[30px] text-center font-semibold">
//                 {count}
//               </div>
//               <button
//                 onClick={() => handlerCountSum("increment")}
//                 className="w-6 h-6 flex items-center justify-center text-[#773FF9]"
//               >
//                 +
//               </button>
//             </div>
//           </div>

//           <div>
//             <p className="mb-2">Buat Catatan</p>
//             <textarea
//               placeholder="Buat catatan untuk penjual..."
//               className="w-full border border-gray-300 p-3 rounded-md h-32 resize-none text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#773FF9]"
//             ></textarea>
//           </div>

//           <Link to="https://wa.me/6282377640374">
//             <p className="bg-[#16B01E] flex items-center justify-center text-white text-sm p-2 rounded-md hover:bg-[#118617] duration-300 gap-2">
//               Lanjutkan ke WhatsApp
//               <IoLogoWhatsapp />
//             </p>
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default ProductDetail;

import { useParams, Link } from "react-router-dom";
import { IoArrowBack, IoLogoWhatsapp } from "react-icons/io5";
import { useState, useEffect } from "react";
import { db } from "../firebase";
import { getDocs, getDoc, doc, collection, query, where } from "firebase/firestore";

function slugToTitle(slug) {
  return slug
    .split("-")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export default function ProductDetail() {

  const [product, setProduct] = useState([])
  const [message, setMessage] = useState("");
  const { category, toko, name } = useParams();
  const [count, setCount] = useState(0);

  function handlerCountSum(action, min) {
    if (action === "increment") {
      setCount(count + 1);
    } else if (action === "decrement" && count > min) {
      setCount(count - 1);
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const q = query(
          collection(db, "product"),
          where("toko", "==", slugToTitle(toko)),
          where("name", "==", slugToTitle(name))
        )
        const querySnapshot = await getDocs(q)
        if (!querySnapshot.empty) {
          setProduct(querySnapshot.docs[0].data());
          setCount(querySnapshot.docs[0].data().minBuy)
        } else {
          setProduct(null);
          setCount(0)
        }
      } catch(err) {
        console.error(err.message)
      }
    }
    fetchData()
  }, [])
  
  return(
    <>
    <div className="px-4 md:px-20 py-10">
      <Link
        to={`/category/${category}`}
        className="flex items-center gap-2 text-[#773FF9] hover:text-[#5a2cbb] transition mb-6"
      >
        <IoArrowBack />
        Kembali ke {category.charAt(0).toUpperCase() + category.slice(1)}
      </Link>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Gambar Produk */}
        <img
          src={product.imgUrl}
          alt={product.name}
          className="w-full sm:w-72 h-60 object-cover rounded-lg shadow-md"
        />

        {/* Detail Produk */}
        <div className="flex-1">
          <h1 className="text-2xl font-bold mb-2">{product.name}</h1>
          <p className="text-gray-500 mb-2">{product.toko}</p>
          <p className="text-[#773FF9] font-bold text-xl mb-4">
            Rp {product?.price?.toLocaleString("id-ID")}
          </p>

          <div className="mb-4 border-b-2 border-[#773FF9] pb-2">
            <p className="font-bold text-lg">Detail Produk</p>
          </div>

          <div className="pb-4">
            <p>
              Kondisi: <span className="font-bold">{product.kondisi}</span>
            </p>
            <p>
              Min. Pemesanan:{" "}
              <span className="font-bold">{product.minBuy}</span>
            </p>
          </div>

          <p className="text-gray-700 leading-relaxed whitespace-pre-line">
            {product.description || "Deskripsi produk belum tersedia."}
          </p>
        </div>
        
        {/* Card kanan (jumlah dan WA) */}
        <div className="border border-gray-300 rounded-md w-full lg:w-80 p-4 flex flex-col gap-4 shadow-sm">
          <h1 className="font-bold pb-2 border-b">Atur Jumlah & Catatan</h1>

          <div>
            <p className="mb-2">Jumlah</p>
            <div className="flex items-center gap-4 border rounded-md px-2 py-1 w-fit">
              <button
                onClick={() => handlerCountSum("decrement", count)}
                disabled={count === 0}
                className={`w-6 h-6 flex items-center justify-center rounded-md ${
                  count === 0
                    ? "cursor-not-allowed text-gray-400"
                    : "text-[#773FF9]"
                }`}
              >
                -
              </button>
              <div className="min-w-[30px] text-center font-semibold">
                {count}
              </div>
              <button
                onClick={() => handlerCountSum("increment")}
                className="w-6 h-6 flex items-center justify-center text-[#773FF9]"
              >
                +
              </button>
            </div>
          </div>

          <div>
            <p className="mb-2">Buat Catatan</p>
            <textarea
              placeholder="Buat catatan untuk penjual..."
              className="w-full border border-gray-300 p-3 rounded-md h-32 resize-none text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#773FF9]"
              onChange={(e) => setMessage(e.target.value)}
            ></textarea>
          </div>

          <Link to={`https://wa.me/${product.nomor}?text=Halo! saya mau pesan ${product.name} dengan jumlah ${count}, ${encodeURIComponent(message)}`}>
            <p className="bg-[#16B01E] flex items-center justify-center text-white text-sm p-2 rounded-md hover:bg-[#118617] duration-300 gap-2">
              Lanjutkan ke WhatsApp
              <IoLogoWhatsapp />
            </p>
          </Link>
        </div>
      </div>
    </div>

    </>
  )
}

