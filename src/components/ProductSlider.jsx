import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";
import { useRef } from "react";
import bannerItems from "../db/BannerItems";

export default function ProductSlider() {
  const swiperRef = useRef(null);

  return (
    <div className="w-full max-w-7xl mx-auto mt-6 sm:mt-8 md:mt-10 relative group px-3 sm:px-6 md:px-0">
      {/* Tombol Panah Kiri */}
      <button
        onClick={() => swiperRef.current?.slidePrev()}
        className="absolute left-3 sm:left-6 bottom-[40%] sm:bottom-[43%] translate-y-10 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-out bg-white/80 p-2 sm:p-3 rounded-full shadow hover:bg-white z-10 cursor-pointer hidden md:flex"
      >
        <IoChevronBack size={20} className="sm:size-24" />
      </button>

      {/* Tombol Panah Kanan */}
      <button
        onClick={() => swiperRef.current?.slideNext()}
        className="absolute right-3 sm:right-6 bottom-[40%] sm:bottom-[43%] translate-y-10 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-out bg-white/80 p-2 sm:p-3 rounded-full shadow hover:bg-white z-10 cursor-pointer hidden md:flex"
      >
        <IoChevronForward size={20} className="sm:size-24" />
      </button>

      {/* Swiper */}
      <Swiper
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        spaceBetween={20}
        centeredSlides={true}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        loop={true}
        pagination={{
          clickable: true,
          bulletClass: "swiper-pagination-bullet custom-bullet",
          bulletActiveClass:
            "swiper-pagination-bullet-active custom-bullet-active",
        }}
        modules={[Autoplay, Pagination]}
        className="rounded-xl sm:rounded-2xl shadow-lg w-full"
      >
        {bannerItems.map((product) => (
          <SwiperSlide key={product.id}>
            <div className="relative overflow-hidden rounded-xl sm:rounded-2xl cursor-pointer">
              {/* Gambar Produk */}
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-[180px] xs:h-[220px] sm:h-[260px] md:h-[320px] lg:h-[420px] object-cover rounded-xl sm:rounded-2xl transition-all duration-700 ease-in-out group-hover:scale-105 group-hover:brightness-[70%]"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent flex items-center justify-center p-2 sm:p-4 text-white">
                <h2 className="text-lg xs:text-xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold text-center leading-tight">
                  {product.name}
                </h2>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
