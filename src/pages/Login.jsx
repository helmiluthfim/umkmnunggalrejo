import React, { useEffect, useState } from "react";
import { Label } from "../components/ui/label";
import { Input } from "../components/ui/input";
import { Link, useNavigate } from "react-router-dom";

import { db } from "../firebase";
import {
  getDoc,
  getDocs,
  collection,
  query,
  where,
  limit,
} from "firebase/firestore";
import { userStore } from "../state/state";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const user = userStore((state) => state.currentUser);
  const setCurrentUser = userStore((state) => state.setCurrentUser);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const q = query(
        collection(db, "users"),
        where("username", "==", username),
        where("password", "==", password),
        limit(1),
      );
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        const doc = querySnapshot.docs[0];
        const data = { id: doc.id, ...doc.data() };
        setCurrentUser(data);
        alert(data.id);
        navigate("/admin");
      } else {
        alert("user ga ada");
      }
    } catch (err) {
      alert(`error ${err.message}`);
    }
  };

  useEffect(() => {
    if (user) {
      navigate("/admin");
    }
  });

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
      <div className="bg-white shadow-lg rounded-2xl w-full max-w-sm p-8">
        <h1 className="text-2xl font-bold text-center text-[#773FF9] mb-6">
          Masuk Akun
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">
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
              id="email"
              placeholder="Masukkan username kamu"
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#773FF9]"
            />
          </div>

          <div>
            <Label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Kata Sandi
            </Label>
            <Input
              onChange={(e) => setPassword(e.target.value)}
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
            Masuk
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-6">
          Belum punya akun?{" "}
          <Link to="/signup">
            <span className="text-[#773FF9] hover:text-[#5a2cbb] font-medium cursor-pointer">
              Daftar Sekarang
            </span>
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
