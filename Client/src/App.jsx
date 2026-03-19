import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import MyOrders from "./pages/MyOrders";
import AdminRoute from "./components/AdminRoute";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminProducts from "./pages/admin/AdminProducts";
import AdminOrders from "./pages/admin/AdminOrders";
import AdminAddProduct from "./pages/admin/AdminAddProduct";
import Layout from "./components/Layout";
import Contact from "./pages/Contact";
import Footer from "./components/Footer";
import About from "./pages/About";
import ProductDetailDynamic from "./pages/ProductDetailDynamic";
import ScrollToTop from "./services/ScrollToTop";

function App() {

  
  return (
    <div  class="px-4 border-none sm:px-[5vw] md:px-[7vw] lg:px-[9vw]">
    <BrowserRouter>
      <Navbar />
       <ScrollToTop />

      <Routes>
        <Route path="/collection" element={<Home />} />
        <Route path="/" element={<Layout/>} />
        <Route path="/contact" element={<Contact/>} />


        <Route path="/products/:id" element={<ProductDetails />} />
        <Route path="/product/:id" element={<ProductDetailDynamic />} />


        <Route path="/orders" element={<MyOrders />} />
        <Route
          path="/cart"
          element={
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          }
        />
        <Route
  path="/admin/add"
  element={
    <AdminRoute>
      <AdminAddProduct />
    </AdminRoute>
  }
/>
        <Route
          path="/admin/products"
          element={
            <AdminRoute>
              <AdminProducts />
            </AdminRoute>
          }

        />

         <Route
          path="/admin/orders"
          element={
            <AdminRoute>
              <AdminOrders />
            </AdminRoute>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/about" element={<About />} />

      </Routes>
    </BrowserRouter>

    <Footer/>
    </div>
  );
}

export default App;
