const products = [
  {
    id: 1,
    name: "Mi Ayam",
    imgUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPeFcwsRPoRXz5md--0N1iIqXcnygu4C61Dg&s",
    slug: "mie-ayam",
    price: 15000,
    toko: "Toko A",
    category: "makanan",
    kondisi: "Baru",
    minBuy: 1,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  },
  {
    id: 2,
    name: "Tas Daur Ulang",
    imgUrl:
      "https://media.karousell.com/media/photos/products/2020/02/08/hand_bag_tas_daur_ulang_tas_kerajinan_tangan_1581153658_4647002e.jpg",
    slug: "tas-daur-ulang-plastik",
    price: 75000,
    toko: "Toko B",
    category: "daur ulang",
    kondisi: "Baru",
    minBuy: 1,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  },
  {
    id: 3,
    name: "Lampu Hias",
    imgUrl:
      "https://d1r9hss9q19p18.cloudfront.net/uploads/2016/01/Sprudge-LampadaLampshades-KarinaHof-Lampada_lampshade6_Vilma_Farrell-740x555.jpg",
    slug: "lampu-hias",
    price: 100000,
    toko: "Toko C",
    category: "dekorasi",
    kondisi: "Baru",
    minBuy: 1,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  },
  {
    id: 4,
    name: "Kalung Etnik",
    imgUrl:
      "https://image.made-in-china.com/202f0j00pOBtCZokEMqE/Traditional-Vintage-Ethnic-Tassel-Necklaces.webp",
    slug: "kalung-etnik",
    price: 50000,
    toko: "Toko D",
    category: "aksesoris",
    kondisi: "Baru",
    minBuy: 10,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  },
  {
    id: 5,
    name: "Kalung Etnik",
    imgUrl:
      "https://image.made-in-china.com/202f0j00pOBtCZokEMqE/Traditional-Vintage-Ethnic-Tassel-Necklaces.webp",
    slug: "kalung-etnik",
    price: 50000,
    toko: "Toko D",
    category: "aksesoris",
    kondisi: "Baru",
    minBuy: 10,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  },
  {
    id: 6,
    name: "Kalung Etnik",
    imgUrl:
      "https://image.made-in-china.com/202f0j00pOBtCZokEMqE/Traditional-Vintage-Ethnic-Tassel-Necklaces.webp",
    slug: "kalung-etnik",
    price: 50000,
    toko: "Toko D",
    category: "aksesoris",
    kondisi: "Baru",
    minBuy: 10,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  },
  {
    id: 7,
    name: "Kalung Etnik",
    imgUrl:
      "https://image.made-in-china.com/202f0j00pOBtCZokEMqE/Traditional-Vintage-Ethnic-Tassel-Necklaces.webp",
    slug: "kalung-etnik",
    price: 50000,
    toko: "Toko D",
    category: "aksesoris",
    kondisi: "Baru",
    minBuy: 10,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  },
  {
    id: 8,
    name: "Kalung Etnik",
    imgUrl:
      "https://image.made-in-china.com/202f0j00pOBtCZokEMqE/Traditional-Vintage-Ethnic-Tassel-Necklaces.webp",
    slug: "kalung-etnik",
    price: 50000,
    toko: "Toko D",
    category: "aksesoris",
    kondisi: "Baru",
    minBuy: 10,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  },
  {
    id: 9,
    name: "Kalung Etnik",
    imgUrl:
      "https://image.made-in-china.com/202f0j00pOBtCZokEMqE/Traditional-Vintage-Ethnic-Tassel-Necklaces.webp",
    slug: "kalung-etnik",
    price: 50000,
    toko: "Toko D",
    category: "aksesoris",
    kondisi: "Baru",
    minBuy: 10,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  },
  {
    id: 10,
    name: "Kalung Etnik",
    imgUrl:
      "https://image.made-in-china.com/202f0j00pOBtCZokEMqE/Traditional-Vintage-Ethnic-Tassel-Necklaces.webp",
    slug: "kalung-etnik",
    price: 50000,
    toko: "Toko D",
    category: "aksesoris",
    kondisi: "Baru",
    minBuy: 10,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  },
  {
    id: 11,
    name: "Kalung Etnik",
    imgUrl:
      "https://image.made-in-china.com/202f0j00pOBtCZokEMqE/Traditional-Vintage-Ethnic-Tassel-Necklaces.webp",
    slug: "kalung-etnik",
    price: 50000,
    toko: "Toko D",
    category: "aksesoris",
    kondisi: "Baru",
    minBuy: 10,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  },
  {
    id: 12,
    name: "Kalung Etnik",
    imgUrl:
      "https://image.made-in-china.com/202f0j00pOBtCZokEMqE/Traditional-Vintage-Ethnic-Tassel-Necklaces.webp",
    slug: "kalung-etnik",
    price: 50000,
    toko: "Toko D",
    category: "aksesoris",
    kondisi: "Baru",
    minBuy: 10,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  },
];

export default products;
