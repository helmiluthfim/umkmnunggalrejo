import { IoArrowBack } from "react-icons/io5";
import { useParams, useNavigate, Link } from "react-router-dom";
import products from "../db/products";
import Products from "../pages/Products";

function FilterCategory() {
  const navigate = useNavigate();
  const { slug } = useParams();

  // ambil kategori unik dari data produk
  const uniqueCategories = [...new Set(products.map((p) => p.category))];

  // tambahkan kategori "Semua" di awal
  const categories = ["all", ...uniqueCategories];

  // mapping kategori → icon
  const categoryIcons = {
    all: "🟢",
    makanan: "🍜",
    "daur ulang": "♻️",
    dekorasi: "✨",
    aksesoris: "💎",
  };

  // kategori aktif
  const currentCategory = slug ? slug.replace(/-/g, " ") : "all";

  // filter produk sesuai kategori aktif
  const filteredProducts =
    currentCategory === "all"
      ? products
      : products.filter((p) => p.category === currentCategory);

  // navigasi kategori
  const handleCategoryClick = (value) => {
    navigate(`/category/${value.toLowerCase().replace(/\s+/g, "-")}`);
  };

  return (
    <div className="px-4 md:px-8 lg:px-[5.5rem] py-6 md:py-10">
      {/* Tampilkan judul hanya di halaman utama */}
      {!slug && (
        <h1 className="font-bold text-lg md:text-xl mb-4">
          Filter Berdasarkan Kategori
        </h1>
      )}

      {/* Tombol kembali hanya di halaman kategori */}
      {slug && (
        <div className="mb-4">
          <Link
            to="/"
            className="flex items-center gap-2 text-[#773FF9] hover:text-[#5a2cbb] transition text-sm md:text-base"
          >
            <IoArrowBack />
            Kembali ke Home
          </Link>
        </div>
      )}

      {/* Tombol kategori dinamis */}
      <div className="flex flex-wrap gap-2 md:gap-3 mb-6">
        {categories.map((cat, index) => (
          <button
            key={index}
            onClick={() => handleCategoryClick(cat)}
            className={`px-3 md:px-4 py-1.5 md:py-2 rounded-full border flex items-center gap-1.5 md:gap-2 transition cursor-pointer text-sm md:text-base ${
              currentCategory === cat
                ? "bg-[#773FF9] text-white border-black"
                : "bg-gray-100 text-gray-800 hover:bg-gray-200"
            }`}
          >
            <span>{categoryIcons[cat] || "📦"}</span>
            <span>
              {cat === "all"
                ? "Semua"
                : cat.charAt(0).toUpperCase() + cat.slice(1)}
            </span>
          </button>
        ))}
      </div>

      {/* Daftar produk */}
      <div>
        <Products products={filteredProducts} />
      </div>
    </div>
  );
}

export default FilterCategory;
