import { Navigate, Route, Routes } from "react-router";
import HomeScreen from "./pages/HomeScreen";
import TermsScreen from "./pages/TermsScreen";
import NotFoundPage from "./pages/NotFoundPage";
import Login from "./pages/Login";
import FilterCategory from "./components/FilterCategory";
import ProductDetail from "./pages/ProductDetails";
import SearchPage from "./components/Search";
import SignUp from "./pages/SignUp/SignUp";
import DashboardAdmin from "./pages/admin/DashboardAdmin";
import PublicLayout from "./layouts/PublicLayout";
import AdminLayout from "./layouts/AdminLayout";
import EditProfil from "./pages/admin/EditProfil";

function App() {
  return (
    <>
      <Routes>
        <Route element={<PublicLayout />}>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/terms" element={<TermsScreen />} />
          <Route path="/login" element={<Login />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/" element={<Navigate to="/category/all" replace />} />
          <Route path="/category/:slug" element={<FilterCategory />} />
          {/* <Route path="/category/:category/:slug" element={<ProductDetail />} /> */}
          <Route path="/:category/:toko/:name" element={<ProductDetail />} />
          <Route path="/signup" element={<SignUp />} />
        </Route>

        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<DashboardAdmin />} />
          <Route path="edit-profile" element={<EditProfil />} />
          <Route path="change-password" element={<EditProfil />} />
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export default App;
