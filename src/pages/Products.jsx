import { useState } from "react";
import { Link } from "react-router-dom";

function Products({ products = [] }) {
  const INITIAL_COUNT = 8;
  const [viewMore, setViewMore] = useState(INITIAL_COUNT);
  const [expanded, setExpanded] = useState(false);

  // helper untuk slug URL
  const slugify = (text) => text?.toLowerCase().replace(/\s+/g, "-") || "";

  const handleViewMore = () => {
    if (expanded) {
      setViewMore(INITIAL_COUNT);
    } else {
      setViewMore(products.length);
    }
    setExpanded(!expanded);
  };

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-4 md:px-0">
        {products
          // filter data agar tidak crash
          .filter(
            (item) =>
              item &&
              item.kategori &&
              item.toko &&
              item.name &&
              item.imgUrl &&
              item.price !== undefined
          )
          .slice(0, viewMore)
          .map((item) => (
            <div
              key={item.id}
              className="border w-full border-gray-600 rounded-lg shadow-md shadow-gray-600 hover:shadow-xl transition bg-white p-4"
            >
              <Link
                to={`/${slugify(item.kategori)}/${slugify(
                  item.toko
                )}/${slugify(item.name)}`}
              >
                <img
                  src={item.imgUrl}
                  alt={item.name}
                  className="w-full h-30 sm:h-52 md:h-56 lg:h-60 object-cover rounded-md"
                />

                <div className="flex flex-col justify-start mt-2">
                  <h1 className="font-semibold text-base md:text-lg line-clamp-1">
                    {item.name}
                  </h1>

                  <p className="text-gray-500 text-xs md:text-sm line-clamp-1">
                    {item.toko}
                  </p>

                  <p className="text-[#773FF9] font-bold text-sm md:text-base">
                    Rp {item.price.toLocaleString("id-ID")}
                  </p>
                </div>
              </Link>
            </div>
          ))}
      </div>

      <div className="flex justify-center">
        {products.length > INITIAL_COUNT && (
          <button
            onClick={handleViewMore}
            className="mt-6 px-6 py-2 bg-white border-2 border-[#773FF9] text-[#773FF9] rounded-lg hover:bg-[#773FF9] hover:text-white transition cursor-pointer duration-300"
          >
            {expanded ? "Muat Lebih Sedikit..." : "Muat Lebih Banyak..."}
          </button>
        )}
      </div>
    </>
  );
}

export default Products;
