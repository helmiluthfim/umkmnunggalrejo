import { create } from "zustand";

const getUserFromSession = () => {
  const saved = localStorage.getItem("user");
  return saved ? JSON.parse(saved) : null;
};

const userStore = create((set) => ({
  currentUser: getUserFromSession(),
  toko: getUserFromSession()?.toko,

  setCurrentUser: (user) => {
    localStorage.setItem("user", JSON.stringify(user));
    set({
      currentUser: user,
    });
  },

  logout: () => {
    localStorage.removeItem("user");
    set({ currentUser: null, toko: null });
  },
}));

export { userStore };
