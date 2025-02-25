import React from "react";
import Link from "next/link";
import { Cormorant_Garamond, Montserrat } from "next/font/google";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "600"],
});

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export default function HeroSection() {
  return (
    <div className="relative bg-white min-h-screen flex items-center">
      <div className="absolute inset-0">
        <img
          src="/bg.jpg"
          alt="Elegant Wedding Backdrop"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black opacity-50"></div>
      </div>
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1
          className={`
            ${cormorant.className} 
            text-3xl sm:text-4xl md:text-5xl lg:text-6xl
            font-light 
            text-white 
            mb-4 sm:mb-6 
            tracking-wide
          `}
        >
          Wujudkan Pernikahan Impian
        </h1>
        <p
          className="
            text-base sm:text-lg md:text-xl 
            text-white 
            mb-6 sm:mb-10 
            max-w-xl sm:max-w-2xl lg:max-w-3xl
            mx-auto 
            tracking-wider 
            leading-relaxed
            px-4 sm:px-0
          "
        >
          Dewa Management menghadirkan pengalaman pernikahan yang tak terlupakan
          dengan sentuhan profesional dan dedikasi penuh
        </p>
        <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6 px-4 sm:px-0">
          <Link
            href="/page/Fitur"
            className="
              bg-white 
              text-gray-900 
              px-6 sm:px-8 lg:px-10 
              py-2 sm:py-3 
              rounded-sm 
              text-xs sm:text-sm 
              tracking-widest 
              uppercase 
              hover:bg-gray-100 
              transition-colors
              w-full sm:w-auto
            "
          >
            Jelajahi Katalog
          </Link>
          <Link
            href={`https://wa.me/${encodeURIComponent("6281393344476")}`}
            className="
              bg-transparent 
              border-2 border-white 
              text-white 
              px-6 sm:px-8 lg:px-10 
              py-2 sm:py-3 
              rounded-sm 
              text-xs sm:text-sm 
              tracking-widest 
              uppercase 
              hover:bg-white 
              hover:text-gray-900 
              transition-colors
              w-full sm:w-auto
            "
          >
            Hubungi Kami
          </Link>
        </div>
      </div>
    </div>
  );
}
