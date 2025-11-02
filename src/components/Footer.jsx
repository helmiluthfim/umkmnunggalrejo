import { IoLogoInstagram, IoLogoWhatsapp } from "react-icons/io5";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <>
      <div className="flex flex-col md:flex-row justify-between p-4 pb-6 px-4 md:px-8 lg:px-20 items-start gap-8 md:gap-4">
        <div className="flex flex-col gap-4 w-full md:w-auto">
          <h1 className="font-bold text-3xl md:text-4xl lg:text-[48px]">
            Rejo4Craft
          </h1>
          <div className="flex space-x-4 text-xl md:text-2xl lg:text-[24px]">
            <Link to="https://wa.me/6282377640374">
              <IoLogoWhatsapp />
            </Link>
            <Link to="https://www.instagram.com/rejo4craft/">
              <IoLogoInstagram />
            </Link>
          </div>
        </div>
        <div className="flex flex-col gap-4 w-full md:w-auto">
          <h2 className="font-bold text-2xl md:text-3xl lg:text-[32px]">
            Kontak Kami
          </h2>
          <p className="text-sm md:text-base">info@desanunggalrejo.com</p>
          <p className="text-sm md:text-base">+62 812-3456-7890</p>
          <p className="text-sm md:text-base">
            Desa Nunggal Rejo, Kecamatan Punggur,
            <span className="flex flex-col">
              Kabupaten Lampung Tengah, Provinsi Lampung
            </span>
          </p>
        </div>
        <div className="flex flex-col gap-4 w-full md:w-auto">
          <h2 className="font-bold text-2xl md:text-3xl lg:text-[32px]">
            Website Link
          </h2>
          <Link to="/">
            <p className="text-sm md:text-base">Home</p>
          </Link>
          <p className="text-sm md:text-base">Tentang Kami</p>
          <Link to="/login" className="w-30 md:w-auto">
            <p className="bg-[#773FF9] flex justify-center text-white text-sm p-2 px-4 rounded-md hover:bg-[#5a2cbb] duration-300">
              Masuk
            </p>
          </Link>
        </div>
      </div>
      <div className="border-t border-gray-500 flex justify-center p-4 text-sm">
        <p>©2024 Universitas Muhammadiyah Metro</p>
      </div>
    </>
  );
}

export default Footer;
