import { Link } from "react-router-dom";

export default function ProdukSaya() {
  return (
    <div className="bg-white w-full rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="p-6 border-b border-gray-100 flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-800">Produk Saya</h2>
        <Link to="/login" className="w-30 md:w-auto">
          <p className="bg-[#773FF9] flex justify-center text-white text-sm p-2 px-4 rounded-md hover:bg-[#5a2cbb] duration-300">
            Produk Baru
          </p>
        </Link>
      </div>

      <div className=" m-4 p-4 overflow-x-auto border rounded-2xl">
        <div className="flex flex-col items-center justify-center gap-4 lg:flex-row lg:gap-4 lg:justify-start">
          <img
            src="https://laz-img-sg.alicdn.com/other/common/5a791054d1364ddc84f299e451ff5080.webp"
            className="w-40 lg:w-42 h-auto object-cover rounded-lg shadow-md"
          ></img>
          <div className="flex flex-col gap-2">
            <h3 className="font-bold">Nama Produk</h3>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus
              itaque eum, aliquid voluptate error tenetur fugit eius
              reprehenderit dolores doloribus? Error quia reiciendis aliquam
              esse molestias non consectetur voluptates quibusdam!
            </p>
            <p className="text-[#773FF9]">Rp. 8.000.000</p>
          </div>
        </div>

        <div className="flex flex-col gap-4 pt-4">
          <button className="border border-[#773FF9] hover:bg-[#773FF9] hover:text-white text-[#773FF9] rounded-md p-[3px] cursor-pointer duration-200">
            Edit
          </button>
          <button className="border border-black rounded-md bg-[#FF0909] hover:bg-[#e70b0b] text-white p-[3px] cursor-pointer duration-200">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
