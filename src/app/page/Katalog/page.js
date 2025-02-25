"use client";
import React, { useState } from "react";
import { Cormorant_Garamond } from "next/font/google";
import Link from "next/link";
import WeddingCalendar from "../WeddingCalendar/page";
import CustomPackageModal from "../KostumOrder/page";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "600"],
});

const services = [
  {
    name: "Paket Pernikahan Lengkap",
    description:
      "Paket komprehensif yang mencakup semua aspek perencanaan dan pelaksanaan pernikahan dari awal hingga akhir.",
    price: "Rp 50.000.000 - Rp 100.000.000",
    features: [
      "Konsultasi desain dan tema",
      "Manajemen vendor",
      "Dekorasi lengkap",
      "Dokumentasi profesional",
      "Koordinasi hari H",
    ],
    image: "/pernikahan.jpg",
    type: "all-in-one",
  },
  {
    name: "Paket Pernikahan Hemat",
    description:
      "Solusi pernikahan yang efisien dengan layanan inti untuk pasangan yang ingin merayakan momen istimewa tanpa menghabiskan banyak biaya.",
    price: "Rp 25.000.000 - Rp 50.000.000",
    features: [
      "Konsultasi dasar",
      "Bantuan pemilihan venue",
      "Koordinasi vendor utama",
      "Pendampingan hari H",
    ],
    image: "/pernikahan.jpg",
    type: "all-in-one",
  },
  {
    name: "Paket Dekorasi Premium",
    description:
      "Transformasikan ruangan anda dengan dekorasi mewah dan detail yang memukau, menciptakan suasana pernikahan yang tak terlupakan.",
    price: "Rp 30.000.000 - Rp 75.000.000",
    features: [
      "Desain tema custom",
      "Dekorasi eksklusif",
      "Bunga dan centerpiece",
      "Lighting dan tata panggung",
      "Konsultasi desain mendalam",
    ],
    image: "/pernikahan.jpg",
    type: "decoration",
  },
  {
    name: "Paket Dokumentasi Profesional",
    description:
      "Abadikan momen terindah anda dengan tim dokumentasi berpengalaman, menghasilkan album dan video cinematik berkualitas tinggi.",
    price: "Rp 15.000.000 - Rp 40.000.000",
    features: [
      "Foto pre-wedding",
      "Dokumentasi full day",
      "Video cinematic",
      "Album premium",
      "Cetak foto berkualitas",
    ],
    image: "/pernikahan.jpg",
    type: "documentation",
  },
];

export default function CatalogPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedService, setSelectedService] = useState(null);
  const [activeTab, setActiveTab] = useState("paket"); // Default to paket tab on mobile
  const [selectedType, setSelectedType] = useState("all"); // Default "all" untuk menampilkan semua
  const [isCustomModalOpen, setIsCustomModalOpen] = useState(false);

  const handleBuyClick = (service) => {
    setSelectedService(service);
    setActiveTab("paket"); // Reset to paket tab when opening modal
  };

  const typeOptions = [
    { value: "all", label: "Semua" },
    { value: "all-in-one", label: "Paket Lengkap" },
    { value: "decoration", label: "Dekorasi" },
    { value: "documentation", label: "Dokumentasi" },
  ];

  const filteredServices = services.filter(
    (service) =>
      (selectedType === "all" || service.type === selectedType) &&
      service.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-white py-16 sm:py-24 min-h-screen">
      {/* Tombol back diposisikan absolute terhadap container */}
      <div className="absolute top-6 left-6 sm:top-8 sm:left-8"></div>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center sm:mb-16">
          <h2
            className={`
              ${cormorant.className}
              text-3xl 
              font-light 
              text-black 
              tracking-wide
              sm:text-4xl 
            `}
          >
            Katalog Layanan Pernikahan
          </h2>
          <p className="mt-3 mx-auto max-w-xl tracking-wider leading-relaxed text-gray-600 px-4 sm:mt-4 sm:max-w-2xl sm:px-0">
            Temukan paket pernikahan sempurna yang sesuai dengan impian dan
            anggaran anda
          </p>
        </div>

        <div className="max-w-3xl mx-auto mb-12">
          <div className="bg-white p-4 rounded-xl shadow-md">
            <div className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0">
              {/* Search Input with Icon */}
              <div className="flex-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg
                    className="h-5 w-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
                <input
                  type="text"
                  placeholder="Cari paket pernikahan..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border text-gray-600 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition duration-200"
                />
              </div>

              {/* Type Filter with Icon */}
              <div className="relative min-w-[200px]">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg
                    className="h-5 w-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                    />
                  </svg>
                </div>
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="w-full pl-10 pr-10 py-3 appearance-none border text-gray-600 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition duration-200 bg-white cursor-pointer"
                >
                  {typeOptions.map((option) => (
                    <option
                      key={option.value}
                      value={option.value}
                      className="py-2"
                    >
                      {option.label}
                    </option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <svg
                    className="h-5 w-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </div>
            </div>

            {/* Active Filters */}
            <div className="mt-4 flex items-center space-x-2 text-sm text-gray-600">
              <span className="font-medium">Filter Aktif:</span>
              <div className="flex items-center space-x-2">
                {searchTerm && (
                  <span className="inline-flex items-center px-3 py-1 rounded-full bg-pink-100 text-pink-700">
                    Pencarian: {searchTerm}
                    <button
                      onClick={() => setSearchTerm("")}
                      className="ml-2 focus:outline-none"
                    >
                      <svg
                        className="h-4 w-4"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                  </span>
                )}
                {selectedType !== "all" && (
                  <span className="inline-flex items-center px-3 py-1 rounded-full bg-pink-100 text-pink-700">
                    {
                      typeOptions.find((opt) => opt.value === selectedType)
                        ?.label
                    }
                    <button
                      onClick={() => setSelectedType("all")}
                      className="ml-2 focus:outline-none"
                    >
                      <svg
                        className="h-4 w-4"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4 sm:gap-16 text-gray-600">
          {filteredServices.map((service, index) => (
            <div
              key={index}
              className="group px-4 text-center sm:px-0 bg-white rounded-lg shadow-lg overflow-hidden transform transition duration-300 hover:scale-105"
            >
              <div className="mx-auto mb-6 h-64 w-full overflow-hidden">
                <img
                  src={service.image}
                  alt={service.name}
                  className="h-full w-full object-cover transition-all duration-300 group-hover:scale-110"
                />
              </div>

              <h3
                className={`
          ${cormorant.className}
          mt-4
          mb-2 
          text-xl 
          font-light 
          text-black 
          tracking-wide
          sm:mb-3 
          sm:text-2xl 
        `}
              >
                {service.name}
              </h3>

              <p className="mb-3 text-gray-600 px-4 sm:px-6 h-24 overflow-hidden">
                {service.description}
              </p>

              <div className="mb-4 font-semibold text-pink-600">
                {service.price}
              </div>

              <ul className="mb-6 px-4 text-left text-gray-700">
                {service.features.map((feature, featureIndex) => (
                  <li
                    key={featureIndex}
                    className="py-1 border-b last:border-b-0 border-gray-200"
                  >
                    ✓ {feature}
                  </li>
                ))}
              </ul>

              <button
                onClick={() => handleBuyClick(service)}
                className="mb-4 bg-pink-600 text-white px-6 py-2 rounded-full hover:bg-pink-700 transition duration-300"
              >
                Pilih Paket
              </button>
            </div>
          ))}

          <div
            onClick={() => setIsCustomModalOpen(true)}
            className="group px-4 text-center sm:px-0 bg-white rounded-lg shadow-lg overflow-hidden transform transition duration-300 hover:scale-105 min-h-[200px] flex flex-col items-center justify-center cursor-pointer"
          >
            <div className="text-4xl text-pink-600 mb-4">+</div>
            <h3
              className={`${cormorant.className} text-xl font-light text-black tracking-wide sm:text-2xl`}
            >
              Custom Paket
            </h3>
          </div>

          {/* Add the CustomPackageModal */}
          <CustomPackageModal
            isOpen={isCustomModalOpen}
            onClose={() => setIsCustomModalOpen(false)}
          />
        </div>
      </div>

      <div className="mt-16">
        <WeddingCalendar />
      </div>

      {/* Modal Pembayaran - Improved Responsiveness */}
      {selectedService && (
        <div className="fixed inset-0 bg-black text-gray-800 bg-opacity-50 z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="relative w-full max-w-4xl max-h-[90vh] bg-white rounded-lg overflow-hidden shadow-2xl">
            {/* Tombol Tutup */}
            <button
              onClick={() => setSelectedService(null)}
              className="absolute top-4 right-4 bg-gray-200 rounded-full p-2 z-10 hover:bg-gray-300 transition"
            >
              <svg
                className="w-6 h-6 text-gray-700"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            {/* Konten Modal Scrollable */}
            <div className="flex flex-col md:flex-row overflow-y-auto max-h-[85vh]">
              {/* Sisi Kiri - Informasi Paket */}
              <div className="w-full md:w-1/2 bg-pink-50 p-6 md:p-8 overflow-y-auto">
                <img
                  src={selectedService.image}
                  alt={selectedService.name}
                  className="w-full h-48 md:h-64 object-cover rounded-lg mb-4 md:mb-6"
                />
                <h2 className="text-xl md:text-2xl font-semibold text-black mb-2 md:mb-4">
                  {selectedService.name}
                </h2>
                <p className="text-gray-600 mb-2 md:mb-4 text-sm md:text-base">
                  {selectedService.description}
                </p>
                <div className="font-bold text-pink-600 text-lg md:text-xl mb-2 md:mb-4">
                  {selectedService.price}
                </div>
                <ul className="space-y-1 md:space-y-2 text-gray-700 text-sm md:text-base mb-6">
                  {selectedService.features.map((feature, index) => (
                    <li key={index} className="flex items-center">
                      <svg
                        className="w-4 h-4 md:w-5 md:h-5 text-pink-500 mr-2"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>

                {/* Ratings & Reviews Section */}
                <div className="border-t border-gray-200 pt-6">
                  <h3 className="text-lg font-semibold mb-4">
                    Ulasan Pelanggan
                  </h3>

                  {/* Overall Rating */}
                  <div className="mb-6">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex items-center">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <svg
                            key={star}
                            className={`w-5 h-5 ${
                              star <= (selectedService.rating || 5)
                                ? "text-yellow-400"
                                : "text-gray-300"
                            }`}
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                      <span className="text-lg font-semibold">
                        {selectedService.rating || 5}/5
                      </span>
                      <span className="text-sm text-gray-500">
                        ({selectedService.reviewCount || 24} ulasan)
                      </span>
                    </div>
                  </div>

                  {/* Individual Reviews */}
                  <div className="space-y-4">
                    {(
                      selectedService.reviews || [
                        {
                          name: "Maya & Andi",
                          rating: 5,
                          date: "15 Des 2024",
                          comment:
                            "Pelayanan sangat memuaskan dan profesional. Hasil sesuai dengan ekspektasi kami.",
                        },
                        {
                          name: "Deni & Lisa",
                          rating: 4,
                          date: "20 Nov 2024",
                          comment:
                            "Tim sangat membantu dalam perencanaan pernikahan kami. Recommended!",
                        },
                      ]
                    ).map((review, index) => (
                      <div
                        key={index}
                        className="border-b border-gray-200 pb-4"
                      >
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-medium">{review.name}</span>
                          <span className="text-sm text-gray-500">
                            {review.date}
                          </span>
                        </div>
                        <div className="flex items-center mb-2">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <svg
                              key={star}
                              className={`w-4 h-4 ${
                                star <= review.rating
                                  ? "text-yellow-400"
                                  : "text-gray-300"
                              }`}
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                        </div>
                        <p className="text-sm text-gray-600">
                          {review.comment}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Sisi Kanan - Form Pembayaran */}
              <div className="w-full md:w-1/2 p-6 md:p-8 overflow-y-auto">
                <h3 className="text-xl md:text-2xl font-semibold mb-4 md:mb-6 text-center">
                  Form Pemesanan
                </h3>

                <form className="space-y-3 md:space-y-4">
                  {/* Informasi Pasangan */}
                  <div className="border-b pb-4 mb-4">
                    <h4 className="text-lg font-semibold mb-3">
                      Informasi Pasangan
                    </h4>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-gray-700 mb-1 text-sm">
                          Nama Pengantin Pria
                        </label>
                        <input
                          type="text"
                          name="groomName"
                          required
                          className="w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-pink-500"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-700 mb-1 text-sm">
                          Nama Pengantin Wanita
                        </label>
                        <input
                          type="text"
                          name="brideName"
                          required
                          className="w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-pink-500"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Informasi Acara */}
                  <div className="border-b pb-4 mb-4">
                    <h4 className="text-lg font-semibold mb-3">
                      Informasi Acara
                    </h4>
                    <div className="space-y-3">
                      <div>
                        <label className="block text-gray-700 mb-1 text-sm">
                          Tanggal Pernikahan
                        </label>
                        <input
                          type="date"
                          name="weddingDate"
                          required
                          className="w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-pink-500"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-700 mb-1 text-sm">
                          Estimasi Jumlah Tamu
                        </label>
                        <input
                          type="number"
                          name="guestCount"
                          placeholder="Masukkan perkiraan jumlah tamu"
                          required
                          className="w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-pink-500"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-700 mb-1 text-sm">
                          Lokasi Acara
                        </label>
                        <input
                          type="text"
                          name="venue"
                          placeholder="Nama gedung/tempat acara"
                          required
                          className="w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-pink-500 mb-2"
                        />
                        <textarea
                          name="venueAddress"
                          placeholder="Alamat lengkap lokasi"
                          rows={2}
                          required
                          className="w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-pink-500"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Informasi Kontak */}
                  <div className="border-b pb-4 mb-4">
                    <h4 className="text-lg font-semibold mb-3">
                      Informasi Kontak
                    </h4>
                    <div className="space-y-3">
                      <div>
                        <label className="block text-gray-700 mb-1 text-sm">
                          Email
                        </label>
                        <input
                          type="email"
                          name="email"
                          required
                          className="w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-pink-500"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-700 mb-1 text-sm">
                          Nomor WhatsApp
                        </label>
                        <input
                          type="tel"
                          name="whatsapp"
                          required
                          className="w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-pink-500"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-700 mb-1 text-sm">
                          Nomor Telepon Alternatif
                        </label>
                        <input
                          type="tel"
                          name="altPhone"
                          className="w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-pink-500"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Tombol */}
                  <div className="flex justify-between space-x-4 pt-4">
                    <button
                      type="button"
                      onClick={() => setSelectedService(null)}
                      className="w-full bg-gray-200 text-gray-700 px-4 py-2 rounded-md text-sm hover:bg-gray-300 transition"
                    >
                      Batal
                    </button>
                    <Link href="/page/DetailPembayaran">
                      <button
                        type="submit"
                        className="w-full bg-pink-600 text-white px-4 py-2 rounded-md text-sm hover:bg-pink-700 transition"
                      >
                        Lanjutkan ke Pembayaran
                      </button>
                    </Link>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
