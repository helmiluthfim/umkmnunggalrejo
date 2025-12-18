import { useState, useEffect } from "react";
import { db } from "../../firebase";
import { getDoc, doc, collection, addDoc } from "firebase/firestore";

import { Label } from "../../components/ui/label";
import { Input } from "../../components/ui/input";
import { useNavigate } from "react-router-dom";

export default function SignUp() {
  const [username, setUsername] = useState("");
  const [sandi, setSandi] = useState("");
  const [toko, setToko] = useState("");

  function generateUserId(length = 12) {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }

  const userId = generateUserId(16); 

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const docRef = collection(db, "users");
      await addDoc(docRef, {
        username,
        password: sandi,
        toko,
        userId
      });
      navigate("/login");
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
        <div className="bg-white shadow-lg rounded-2xl w-full max-w-sm p-8">
          <h1 className="text-2xl font-bold text-center text-[#773FF9] mb-6">
            Buat Akun
          </h1>

          <form className="space-y-5" onSubmit={handleSubmit}>
            <div style={{ display: "flex", gap: "16px" }}>
              <div>
                <Label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Username
                </Label>
                <Input
                  onChange={(e) => setUsername(e.target.value)}
                  type="text"
                  id="username"
                  placeholder="Username"
                  className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#773FF9]"
                />
              </div>
              <div>
                <Label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Nama Toko
                </Label>
                <Input
                  onChange={(e) => setToko(e.target.value)}
                  type="text"
                  id="toko"
                  placeholder="Nama Toko"
                  className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#773FF9]"
                />
              </div>
            </div>

            <div>
              <Label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Kata Sandi
              </Label>
              <Input
                onChange={(e) => setSandi(e.target.value)}
                type="password"
                id="password"
                placeholder="Masukkan kata sandi"
                className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#773FF9]"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#773FF9] text-white font-semibold py-2 rounded-md hover:bg-[#5a2cbb] transition-all duration-300"
            >
              Buat Akun
            </button>
          </form>

          <p className="text-center text-sm text-gray-500 mt-6">
            Sudah punya akun?{" "}
            <span className="text-[#773FF9] hover:text-[#5a2cbb] font-medium cursor-pointer">
              Masuk
            </span>
          </p>
        </div>
      </div>
    </>
  );
}
