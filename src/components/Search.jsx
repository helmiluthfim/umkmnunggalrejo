import { Link, useLocation } from "react-router-dom";

import products from "../db/products";
import Products from "../pages/Products";
import { IoArrowBack } from "react-icons/io5";

function SearchPage() {
  const { search } = useLocation();
  const query = new URLSearchParams(search).get("q")?.toLowerCase() || "";

  // Filter produk yang cocok dengan pencarian
  const filteredProducts = products.filter(
    (item) =>
      item.name.toLowerCase().includes(query) ||
      item.category.toLowerCase().includes(query) ||
      item.toko.toLowerCase().includes(query)
  );

  return (
    <div className="p-10">
      <Link
        to="/"
        className="flex items-center gap-2 text-[#773FF9] hover:text-[#5a2cbb] transition"
      >
        <IoArrowBack />
        Kembali ke Home
      </Link>
      <h2 className="text-xl font-semibold mb-6">
        Hasil pencarian untuk: <span className="text-[#773FF9]">"{query}"</span>
      </h2>

      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <Products products={filteredProducts} />
        </div>
      ) : (
        <p className="text-gray-500 text-md">
          Tidak ada produk yang cocok dengan pencarian kamu.
        </p>
      )}
    </div>
  );
}

export default SearchPage;
