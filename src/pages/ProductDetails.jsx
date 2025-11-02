import { useParams, Link } from "react-router-dom";
import { IoArrowBack, IoLogoWhatsapp } from "react-icons/io5";
import products from "../db/products";
import { useEffect, useState } from "react";

function ProductDetail() {
  const { category, slug } = useParams();
  const [count, setCount] = useState(0);

  function handlerCountSum(action) {
    if (action === "increment") {
      setCount(count + 1);
    } else if (action === "decrement") {
      // hanya boleh dikurangi jika count > 0
      if (count > 0) {
        setCount(count - 1);
      }
    }
  }

  // ubah slug menjadi nama produk normal
  const productName = slug.replace(/-/g, " ");

  // cari produk berdasarkan kategori dan nama
  const product = products.find(
    (p) =>
      p.category.toLowerCase().replace(/\s+/g, "-") === category &&
      p.name.toLowerCase().replace(/\s+/g, "-") === slug
  );

  if (!product) {
    return (
      <div className="p-10 text-center text-gray-500">
        <p>Produk tidak ditemukan 😢</p>
        <Link to="/" className="text-green-600 hover:underline">
          Kembali ke Beranda
        </Link>
      </div>
    );
  }

  return (
    <div className="px-22 py-10">
      <Link
        to={`/category/${category}`}
        className="flex items-center gap-2 text-[#773FF9] hover:text-[#5a2cbb] transition mb-6"
      >
        <IoArrowBack />
        Kembali ke {category.charAt(0).toUpperCase() + category.slice(1)}
      </Link>

      <div className="flex flex-col md:flex-row gap-8">
        <img
          src={product.imgUrl}
          alt={product.name}
          className="w-70 h-60 object-cover rounded-lg shadow "
        />

        <div>
          <h1 className="text-2xl font-bold mb-2 mr-[9rem]">{product.name}</h1>
          <p className="text-gray-500 mb-2">{product.toko}</p>
          <p className="text-[#773FF9] font-bold text-xl mb-4">
            Rp {product.price.toLocaleString("id-ID")}
          </p>
          <div className="mb-4 border-b-2 border-[#773FF9] pt-4 pb-2 mr-[34rem]">
            <p className="font-bold text-7">Detail Produk</p>
          </div>
          <div className="pb-4 ">
            <p>
              Kondisi: <span className="font-bold">{product.kondisi}</span>
            </p>
            <p>
              Min. Pemesanan:{" "}
              <span className="font-bold">{product.minBuy}</span>
            </p>
          </div>
          <p className="text-gray-700 leading-relaxed mr-[15rem]">
            {product.description || "Deskripsi produk belum tersedia."}
          </p>
        </div>
        <div className="ml-[-10rem] border border-gray-300 rounded-md w-[100rem] h-[25rem] px-4 py-4 flex flex-col gap-4">
          <h1 className="font-bold pb-4">Atur Jumlah Catatan</h1>
          <p className="-mb-4">Jumlah</p>
          <div className="flex items-center gap-4 border rounded-md px-2 mr-40">
            {/* Tombol Kurang */}
            <button
              onClick={() => handlerCountSum("decrement")}
              disabled={count === 0}
              className={`w-5 h-5 flex items-center justify-center 
      ${count === 0 ? " cursor-not-allowed text-gray-400" : "text-[#773FF9]"}`}
            >
              -
            </button>

            {/* Nilai Count */}
            <div className="min-w-[30px] text-center font-semibold">
              {count}
            </div>

            {/* Tombol Tambah */}
            <button
              onClick={() => handlerCountSum("increment")}
              className="w-10 h-10 flex items-center justify-center text-[#773FF9]"
            >
              +
            </button>
          </div>

          <p>Buat Catatan</p>
          <textarea
            placeholder="Buat Catatan Untuk Penjual"
            className="w-full border border-gray-300 p-3 rounded-md h-48 resize-none text-gray-800 align-top focus:outline-none focus:ring-2 focus:ring-[#773FF9]"
          ></textarea>
          <Link to="https://wa.me/6282377640374">
            <p className="bg-[#16B01E] flex items-center justify-center text-white text-sm p-2 px-4 rounded-md hover:bg-[#118617] duration-300 gap-2">
              Lanjutkan ke WhatsApp
              <IoLogoWhatsapp />
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
