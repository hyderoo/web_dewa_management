"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Cormorant_Garamond, Montserrat } from "next/font/google";
import { ArrowLeft } from "lucide-react";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "600"],
});

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Kata sandi tidak cocok");
      return;
    }
    console.log("Registration data:", formData);
  };

  return (
    <div className="min-h-screen lg:flex">
      {/* Left Side - Image Section */}
      <div className="hidden lg:flex lg:w-1/2 bg-pink-50 items-center justify-center p-12">
        <div className="max-w-lg text-center">
          <div className="mb-8">
            <div className="relative w-32 h-32 mx-auto">
              <img
                src="/logo.png"
                alt="Company Logo"
                className="w-full h-full object-contain"
              />
            </div>
          </div>
          <h1
            className={`${cormorant.className} text-4xl font-semibold text-gray-900 mb-4`}
          >
            Selamat Datang
          </h1>
          <p className={`${montserrat.className} text-gray-600 text-lg`}>
            Bergabunglah dengan kami untuk mendapatkan pengalaman terbaik dalam
            merencanakan pernikahan Anda.
          </p>
        </div>
      </div>

      {/* Right Side - Form Section */}
      <div className="lg:w-1/2 min-h-screen overflow-y-auto bg-white">
        <div className="p-4 sm:p-8 lg:p-12">
          <Link
            href="/"
            className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-8"
          >
            <ArrowLeft size={20} className="mr-2" />
            <span className={`${montserrat.className} text-sm`}>Kembali</span>
          </Link>

          {/* Mobile Logo */}
          <div className="lg:hidden flex justify-center mb-8">
            <div className="relative w-24 h-24">
              <img
                src="/logo.png"
                alt="Company Logo"
                className="w-full h-full object-contain"
              />
            </div>
          </div>

          <h2
            className={`
              ${cormorant.className} 
              text-3xl
              text-gray-900 
              mb-8
              font-semibold
            `}
          >
            Buat Akun Baru
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="name"
                className={`
                  ${montserrat.className}
                  block text-sm font-medium text-gray-700 mb-2
                `}
              >
                Nama Lengkap
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="
                  w-full 
                  px-4 
                  py-3 
                  border 
                  border-gray-200
                  rounded-md
                  focus:outline-none 
                  focus:ring-2 
                  focus:ring-pink-200
                  focus:border-pink-300
                  transition-colors
                "
                placeholder="Masukkan nama lengkap"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className={`
                  ${montserrat.className}
                  block text-sm font-medium text-gray-700 mb-2
                `}
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="
                  w-full 
                  px-4 
                  py-3 
                  border 
                  border-gray-200
                  rounded-md
                  focus:outline-none 
                  focus:ring-2 
                  focus:ring-pink-200
                  focus:border-pink-300
                  transition-colors
                "
                placeholder="contoh@email.com"
              />
            </div>

            <div>
              <label
                htmlFor="phone"
                className={`
                  ${montserrat.className}
                  block text-sm font-medium text-gray-700 mb-2
                `}
              >
                Nomor Telepon
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                className="
                  w-full 
                  px-4 
                  py-3 
                  border 
                  border-gray-200
                  rounded-md
                  focus:outline-none 
                  focus:ring-2 
                  focus:ring-pink-200
                  focus:border-pink-300
                  transition-colors
                "
                placeholder="Masukkan nomor telepon"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className={`
                  ${montserrat.className}
                  block text-sm font-medium text-gray-700 mb-2
                `}
              >
                Kata Sandi
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="
                  w-full 
                  px-4 
                  py-3 
                  border 
                  border-gray-200
                  rounded-md
                  focus:outline-none 
                  focus:ring-2 
                  focus:ring-pink-200
                  focus:border-pink-300
                  transition-colors
                "
                placeholder="Buat kata sandi"
              />
            </div>

            <div>
              <label
                htmlFor="confirmPassword"
                className={`
                  ${montserrat.className}
                  block text-sm font-medium text-gray-700 mb-2
                `}
              >
                Konfirmasi Kata Sandi
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                className="
                  w-full 
                  px-4 
                  py-3 
                  border 
                  border-gray-200
                  rounded-md
                  focus:outline-none 
                  focus:ring-2 
                  focus:ring-pink-200
                  focus:border-pink-300
                  transition-colors
                "
                placeholder="Ulangi kata sandi"
              />
            </div>

            <button
              type="submit"
              className="
                w-full 
                bg-pink-500 
                text-white 
                px-4 
                py-3
                rounded-md
                text-sm 
                font-medium
                tracking-wide 
                hover:bg-pink-600 
                transition-colors
                shadow-sm
              "
            >
              Daftar
            </button>
          </form>

          <div className="mt-8 text-center">
            <p
              className={`
                ${montserrat.className}
                text-sm 
                text-gray-600
              `}
            >
              Sudah punya akun?{" "}
              <Link
                href="/page/Login"
                className="
                  text-pink-500
                  hover:text-pink-600
                  font-medium
                  transition-colors
                "
              >
                Masuk
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
