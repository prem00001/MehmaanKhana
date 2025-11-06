import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Rooms from "./pages/Rooms";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Support from "./pages/Support";
import Discover from "./pages/Discover";
import Terms from "./pages/Terms";
import Partners from "./pages/Partners";
import Booking from "./pages/Booking";
import Login from "./pages/Login";
import BookDetails from "./pages/BookDetails";
import Payment from "./pages/Payment";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

function AppContent() {
  const location = useLocation();

  // Hide Navbar & Footer on these pages
  const hideNavbarFooter = ["/login", "/booking", "/book-details", "/payment", "/admin/login", "/admin"].includes(location.pathname);
  const hideOnlyPayment = ["/payment"].includes(location.pathname);

  return (
    <>
      {!hideNavbarFooter && <Navbar />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/rooms" element={<Rooms />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/login" element={<Login />} />
        <Route path="/book-details" element={<BookDetails />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminDashboard />} />

        {/* Footer Pages */}
        <Route path="/support" element={<Support />} />
        <Route path="/discover" element={<Discover />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/partners" element={<Partners />} />
      </Routes>

      {!hideNavbarFooter && !hideOnlyPayment && <Footer />}
    </>
  );
}

export default App;
