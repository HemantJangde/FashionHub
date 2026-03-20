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
import NotFound from "./components/NotFound";
import { WifiCog, UserCog, Toilet, ScanFace, Ghost } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

function App() {
    const icons = [WifiCog, UserCog, Toilet, ScanFace, Ghost];
  const [currentIcon, setCurrentIcon] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if loader was already shown before
    const hasLoadedBefore = localStorage.getItem("hasLoaded");

    // if (hasLoadedBefore) {
    //   setLoading(false);
    //   return;
    // }

    // Rotate icons smoothly
    const iconInterval = setInterval(() => {
      setCurrentIcon((prev) => (prev + 1) % icons.length);
    }, 700);

    // Simulate first-time loading
    const timer = setTimeout(() => {
      setLoading(false);
      localStorage.setItem("hasLoaded", "true");
    }, 3000);

    return () => {
      clearInterval(iconInterval);
      clearTimeout(timer);
    };
  }, []);

  if (loading) {
    const Icon = icons[currentIcon];
    return (
      <motion.div
        className="fixed inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-white via-[#fafafa] to-[#f5f5f5] z-[9999] overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        {/* Background shimmer glow */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-[#0C226B]/25 via-[#ff6726]/35 to-[#0C226B]/25"
          animate={{
            backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{
            backgroundSize: "300% 300%",
            filter: "blur(40px)",
          }}
        ></motion.div>

        {/* Rotating Icon Transition */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIcon}
            initial={{ opacity: 0, scale: 0.7, rotate: -15 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, scale: 0.5, rotate: 15 }}
            transition={{ duration: 0.1 }}
            className="relative mb-4"
          >
            <Icon className="w-14 h-14 text-orange-500 drop-shadow-lg" />
          </motion.div>
        </AnimatePresence>
      </motion.div>
    );
  }
  return (
    <div class="px-4 border-none sm:px-[5vw] md:px-[7vw] lg:px-[9vw]">
      <BrowserRouter>
        <Navbar />
        <ScrollToTop />

        <Routes>
          <Route path="/collection" element={<Home />} />
          <Route path="/" element={<Layout />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />

          <Route path="/products/:id" element={<ProductDetails />} />
          <Route path="/product/:id" element={<ProductDetailDynamic />} />

          <Route path="/orders" element={
            <ProtectedRoute><MyOrders /></ProtectedRoute>} />
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

      <Footer />
    </div>
  );
}

export default App;
