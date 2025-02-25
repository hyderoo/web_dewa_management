"use client";
import React, { useState, useEffect } from "react";
import { Cormorant_Garamond, Montserrat } from "next/font/google";
import { ChevronLeft, Search, X, Maximize2, Minimize2 } from "lucide-react";
import { useRouter } from "next/navigation";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300"],
});

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500"],
});

const portfolioCategories = [
  "Semua Acara",
  "Pernikahan Adat",
  "Pernikahan Modern",
  "Intimate Wedding",
  "Destination Wedding",
];

const portfolioItems = [
  {
    id: 1,
    title: "Pernikahan Adat Jawa Elegan",
    category: "Pernikahan Adat",
    image: "/nikah.jpg",
    description: "Upacara sakral dengan nuansa tradisional yang memukau",
  },
  {
    id: 2,
    title: "Pernikahan Modern Minimalis",
    category: "Pernikahan Modern",
    image: "/nikah.jpg",
    description: "Desain kontemporer dengan sentuhan elegan dan sederhana",
  },
  {
    id: 3,
    title: "Intimate Garden Wedding",
    category: "Intimate Wedding",
    image: "/nikah.jpg",
    description: "Suasana intim di tengah keindahan alam",
  },
  {
    id: 4,
    title: "Destination Wedding Bali",
    category: "Destination Wedding",
    image: "/nikah.jpg",
    description: "Momen spesial di lokasi eksotis pulau Bali",
  },
  {
    id: 5,
    title: "Pernikahan Adat Sunda",
    category: "Pernikahan Adat",
    image: "/nikah.jpg",
    description: "Pesona budaya Sunda dalam balutan modern",
  },
  {
    id: 6,
    title: "Urban Chic Wedding",
    category: "Pernikahan Modern",
    image: "/nikah.jpg",
    description: "Konsep perkotaan dengan sentuhan glamor",
  },
];

export default function PortfolioPage() {
  const router = useRouter();
  const [activeCategory, setActiveCategory] = useState("Semua Acara");
  const [selectedImage, setSelectedImage] = useState(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Handle keyboard events
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (selectedImage) {
        if (e.key === "Escape") {
          closeImageModal();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedImage]);

  const filteredPortfolio =
    activeCategory === "Semua Acara"
      ? portfolioItems
      : portfolioItems.filter((item) => item.category === activeCategory);

  const openImageModal = (image) => {
    setSelectedImage(image);
    setIsFullscreen(false);
  };

  const closeImageModal = () => {
    setSelectedImage(null);
    setIsFullscreen(false);
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  const goBack = () => {
    router.back();
  };

  return (
    <div className={`bg-white py-20 ${montserrat.className} text-gray-600`}>
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className={`text-4xl mb-6 ${cormorant.className} text-gray-800`}>
            Portfolio Kami
          </h1>
          <p className="text-gray-600 text-sm md:text-base tracking-wider max-w-2xl mx-auto">
            Setiap pernikahan adalah cerita unik. Temukan inspirasi dari koleksi
            momen istimewa yang telah kami hadirkan.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          {portfolioCategories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`
                px-4 py-2 rounded-full text-sm font-medium transition-all
                ${
                  activeCategory === category
                    ? "bg-gray-700 text-white"
                    : "bg-white text-gray-700 hover:bg-gray-100"
                }
              `}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Portfolio Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {filteredPortfolio.map((item) => (
            <div
              key={item.id}
              className="text-center p-6 bg-white rounded-lg hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => openImageModal(item)}
            >
              <div className="relative overflow-hidden rounded-lg mb-4">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-64 object-cover transform hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
                  <Search
                    className="text-white opacity-0 hover:opacity-100 transition-opacity duration-300"
                    size={48}
                  />
                </div>
              </div>
              <h3 className={`text-xl mb-3 ${cormorant.className}`}>
                {item.title}
              </h3>
              <p className="text-gray-600 text-sm">{item.description}</p>
            </div>
          ))}
        </div>

        {/* Image Modal */}
        {selectedImage && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75 p-4"
            onClick={closeImageModal}
          >
            <div
              className={`
                relative w-full max-w-6xl mx-auto 
                ${isFullscreen ? "h-full" : "max-h-[90vh]"}
                flex flex-col bg-white rounded-lg shadow-2xl overflow-hidden
              `}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Image Container */}
              <div
                className={`
                flex-grow flex items-center justify-center 
                ${isFullscreen ? "h-full" : "max-h-[80vh]"}
                bg-black
              `}
              >
                <img
                  src={selectedImage.image}
                  alt={selectedImage.title}
                  className={`
                    object-contain
                    ${isFullscreen ? "w-full h-full" : "max-w-full max-h-full"}
                  `}
                />
              </div>

              {/* Image Info */}
              <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 p-4 text-white">
                <div className="flex justify-between items-center">
                  <div>
                    <h3
                      className={`text-xl sm:text-2xl ${cormorant.className}`}
                    >
                      {selectedImage.title}
                    </h3>
                    <p className="text-sm sm:text-base">
                      {selectedImage.description}
                    </p>
                  </div>
                </div>
              </div>

              {/* Modal Controls */}
              <div className="absolute top-4 right-4 flex space-x-4">
                {/* Fullscreen Toggle */}
                <button
                  onClick={toggleFullscreen}
                  className="text-white hover:text-gray-300 transition-colors"
                  aria-label={
                    isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"
                  }
                >
                  {isFullscreen ? (
                    <Minimize2 size={24} />
                  ) : (
                    <Maximize2 size={24} />
                  )}
                </button>

                {/* Close Button */}
                <button
                  onClick={closeImageModal}
                  className="text-white hover:text-gray-300 transition-colors"
                  aria-label="Close"
                >
                  <X size={24} />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
