"use client";
import React, { useState } from "react";
import { Cormorant_Garamond, Montserrat } from "next/font/google";
import Link from "next/link";
import { useRouter } from "next/navigation";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300"],
});

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500"],
});

const BaseLayout = ({ children, isLoggedIn = true }) => {
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileReviewOpen, setMobileReviewOpen] = useState(false);
  const [reviewOpen, setReviewOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleLogout = () => {
    router.push("/page/Logout");
  };

  return (
    <div className={`min-h-screen bg-white ${montserrat.className}`}>
      <nav className="fixed top-0 w-full bg-white shadow-sm z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-24 items-center relative">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-3">
              <img
                src="/logo.png"
                alt="Dewa Management Logo"
                className="h-12 sm:h-16 w-auto"
              />
              <div className="flex flex-col">
                <span
                  className={`text-2xl sm:text-3xl font-light text-black ${cormorant.className}`}
                >
                  DEWA
                </span>
                <span className="text-xs tracking-[0.3em] text-gray-600 uppercase">
                  Management
                </span>
              </div>
            </Link>

            {/* Menu Desktop */}
            <div className="hidden md:flex space-x-6 lg:space-x-12">
              <Link
                href="/"
                className="text-gray-800 hover:text-black text-sm tracking-widest uppercase"
              >
                Utama
              </Link>
              <Link
                href="/page/Profile"
                className="text-gray-800 hover:text-black text-sm tracking-widest uppercase"
              >
                Tentang Kami
              </Link>
              <Link
                href="/page/Fitur"
                className="text-gray-800 hover:text-black text-sm tracking-widest uppercase"
              >
                Layanan
              </Link>
              {/* Review with Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setReviewOpen(!reviewOpen)}
                  onMouseEnter={() =>
                    window.innerWidth >= 1024 && setReviewOpen(true)
                  }
                  onMouseLeave={() =>
                    window.innerWidth >= 1024 && setReviewOpen(false)
                  }
                  className="text-gray-800 hover:text-black text-sm tracking-widest uppercase focus:outline-none"
                >
                  Pesanan
                </button>
                {reviewOpen && (
                  <div
                    className="absolute top-full left-0 bg-white shadow-lg py-2 w-48"
                    onMouseEnter={() =>
                      window.innerWidth >= 1024 && setReviewOpen(true)
                    }
                    onMouseLeave={() =>
                      window.innerWidth >= 1024 && setReviewOpen(false)
                    }
                  >
                    <Link
                      href="/page/PaketSelesai"
                      className="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-100"
                    >
                      Paket Selesai
                    </Link>
                    <Link
                      href="/page/PaketBerlangsung"
                      className="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-100"
                    >
                      Paket Berlangsung
                    </Link>
                  </div>
                )}
              </div>
              <Link
                href="/page/Tim"
                className="text-gray-800 hover:text-black text-sm tracking-widest uppercase"
              >
                Tim
              </Link>
              {isLoggedIn ? (
                <>
                  <button
                    onClick={handleLogout}
                    className="text-gray-800 hover:text-black text-sm tracking-widest uppercase"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <Link
                  href="/page/Login"
                  className="text-gray-800 hover:text-black text-sm tracking-widest uppercase"
                >
                  Masuk
                </Link>
              )}
            </div>

            {/* Tombol Mobile Menu */}
            <div className="md:hidden">
              <button
                onClick={toggleMobileMenu}
                className="text-gray-800 focus:outline-none"
              >
                {mobileMenuOpen ? (
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    ></path>
                  </svg>
                ) : (
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16M4 18h16"
                    ></path>
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* Menu Mobile */}
          {mobileMenuOpen && (
            <div className="absolute top-full left-0 w-full bg-white shadow-lg md:hidden">
              <div className="flex flex-col space-y-4 p-4">
                <Link
                  href="/"
                  className="text-gray-800 hover:text-black text-sm tracking-widest uppercase"
                  onClick={toggleMobileMenu}
                >
                  Utama
                </Link>
                <Link
                  href="/page/Profile"
                  className="text-gray-800 hover:text-black text-sm tracking-widest uppercase"
                  onClick={toggleMobileMenu}
                >
                  Tentang Kami
                </Link>
                <Link
                  href="/page/Fitur"
                  className="text-gray-800 hover:text-black text-sm tracking-widest uppercase"
                  onClick={toggleMobileMenu}
                >
                  Layanan
                </Link>
                {/* Review Mobile Dropdown */}
                <div className="relative">
                  <button
                    onClick={() => setMobileReviewOpen(!mobileReviewOpen)}
                    className="text-gray-800 hover:text-black text-sm tracking-widest uppercase w-full text-left"
                  >
                    Review
                  </button>
                  {mobileReviewOpen && (
                    <div className="pl-4 space-y-2 mt-2">
                      <Link
                        href="/page/Review/Selesai"
                        className="block text-gray-800 hover:text-black text-sm tracking-widest uppercase"
                        onClick={toggleMobileMenu}
                      >
                        Selesai
                      </Link>
                      <Link
                        href="/page/Review/Berlangsung"
                        className="block text-gray-800 hover:text-black text-sm tracking-widest uppercase"
                        onClick={toggleMobileMenu}
                      >
                        Berlangsung
                      </Link>
                    </div>
                  )}
                </div>
                {isLoggedIn ? (
                  <>
                    <Link
                      href="/page/Profile"
                      className="text-gray-800 hover:text-black text-sm tracking-widest uppercase"
                      onClick={toggleMobileMenu}
                    >
                      Profile
                    </Link>
                    <button
                      onClick={() => {
                        handleLogout();
                        toggleMobileMenu();
                      }}
                      className="text-gray-800 hover:text-black text-sm tracking-widest uppercase text-left"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <Link
                    href="/page/Login"
                    className="text-gray-800 hover:text-black text-sm tracking-widest uppercase"
                    onClick={toggleMobileMenu}
                  >
                    Masuk
                  </Link>
                )}
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Konten Utama dengan Padding Responsif */}
      <main className="pt-24 min-h-screen px-4 sm:px-6 lg:px-8">
        {children}
      </main>

      {/* Footer Responsif */}
      <footer className="bg-gray-50">
        <div className="max-w-7xl mx-auto py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-center space-y-6">
            <img
              src="/logo.png"
              alt="Dewa Management Logo"
              className="h-16 sm:h-20 w-auto"
            />
            <div className="text-center">
              <h3
                className={`text-xl sm:text-2xl font-light text-black mb-2 ${cormorant.className}`}
              >
                DEWA MANAGEMENT
              </h3>
              <p className="text-gray-600 text-sm tracking-wider max-w-md px-4 sm:px-0">
                Mewujudkan pernikahan impian dengan sentuhan elegan
              </p>
            </div>
            <div className="flex space-x-8 mt-6">
              <a
                href="https://www.instagram.com/dewa_management?igsh=MXB1aWg1N3VzdXd4bg=="
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <span className="sr-only">Instagram</span>
                <svg
                  className="h-5 w-5 sm:h-6 sm:w-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    fillRule="evenodd"
                    d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </a>
              <a
                href={`https://wa.me/${encodeURIComponent("6281393344476")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <span className="sr-only">WhatsApp</span>
                <svg
                  className="h-5 w-5 sm:h-6 sm:w-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"></path>
                </svg>
              </a>
            </div>
            <p className="text-center text-gray-500 mt-8 text-xs sm:text-sm tracking-wider px-4 sm:px-0">
              © {new Date().getFullYear()} Dewa Management. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default BaseLayout;
