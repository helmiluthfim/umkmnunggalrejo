import { Navigate, Route, Routes } from "react-router";
import HomeScreen from "./pages/HomeScreen";
import TermsScreen from "./pages/TermsScreen";
import NotFoundPage from "./pages/NotFoundPage";
import Login from "./pages/Login";
import FilterCategory from "./components/FilterCategory";
import ProductDetail from "./pages/ProductDetails";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import SearchPage from "./components/Search";
import SignUp from "./pages/SignUp/SignUp";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/terms" element={<TermsScreen />} />
        <Route path="/login" element={<Login />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/" element={<Navigate to="/category/all" replace />} />
        <Route path="/category/:slug" element={<FilterCategory />} />
        {/* <Route path="/category/:category/:slug" element={<ProductDetail />} /> */}
        <Route path="/:category/:toko/:name" element={<ProductDetail/>} />
        <Route path="*" element={<NotFoundPage />} />
        <Route path="/signup" element={<SignUp/>} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;
