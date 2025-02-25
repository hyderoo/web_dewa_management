"use client";
import React, { useState } from "react";
import { Cormorant_Garamond } from "next/font/google";
import { useRouter } from "next/navigation";
import { ArrowLeft, Edit, Trash2, PlusCircle, Search, X } from "lucide-react";
import AddServiceModal from "./AddServiceModal.js";
import EditServiceModal from "./EditServiceModal.js";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "600"],
});

export default function ServiceManagement() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("all");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [serviceToEdit, setServiceToEdit] = useState(null);
  const [services, setServices] = useState([
    {
      id: 1,
      title: "Koordinasi Pernikahan Menyeluruh",
      packageName: "Paket Lamaran Premium",
      description:
        "Layanan komprehensif untuk merancang dan mengeksekusi pernikahan impian Anda. Kami menyediakan koordinasi profesional dari perencanaan awal hingga hari bahagia, dengan perhatian detail yang tak tertandingi.",
      highlights: [
        "Koordinator acara berpengalaman",
        "Timeline acara terperinci",
        "Koordinasi vendor terpilih",
        "Gladi bersih profesional",
        "Pendampingan penuh selama 12 jam",
      ],
      image: "/produk1.jpg",
      price: 15000000,
      type: "koordinasi",
    },
    {
      id: 2,
      title: "Dekorasi Pernikahan Eksklusif",
      packageName: "Paket Dekorasi Elit",
      description:
        "Transformasi ruang pernikahan menjadi panggung romantis yang menceritakan kisah cinta Anda. Desain khusus yang memadukan estetika dan makna personal.",
      highlights: [
        "Dekorasi pelaminan premium",
        "Area photo booth artistik",
        "Desain pathway yang memukau",
        "Instalasi standing flower",
        "Konsultasi desain personal",
      ],
      image: "/produk2.jpg",
      price: 25000000,
      type: "dekorasi",
    },
  ]);

  const typeOptions = [
    { value: "all", label: "Semua Layanan" },
    { value: "koordinasi", label: "Koordinasi" },
    { value: "dekorasi", label: "Dekorasi" },
  ];

  // Filtering services
  const filteredServices = services.filter(
    (service) =>
      (selectedType === "all" || service.type === selectedType) &&
      (service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        service.packageName.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  // Handle delete service
  const handleDeleteService = (serviceId) => {
    const confirmDelete = window.confirm(
      "Apakah Anda yakin ingin menghapus layanan ini?"
    );
    if (confirmDelete) {
      setServices((prev) => prev.filter((service) => service.id !== serviceId));
    }
  };

  const handleAddService = (newService) => {
    setServices((prevServices) => [...prevServices, newService]);
  };

  const handleEditService = (updatedService) => {
    setServices((prevServices) =>
      prevServices.map((service) =>
        service.id === updatedService.id ? updatedService : service
      )
    );
  };

  const startEditService = (service) => {
    setServiceToEdit(service);
    setIsEditModalOpen(true);
  };

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className="bg-white min-h-screen py-8 sm:py-16 relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 sm:mb-12 text-center">
          <h2
            className={`
              ${cormorant.className}
              text-2xl 
              sm:text-3xl 
              lg:text-4xl 
              font-light 
              text-gray-800 
              tracking-wide
            `}
          >
            Manajemen Layanan
          </h2>
          <p className="mt-2 sm:mt-3 mx-auto max-w-xl tracking-wider leading-relaxed text-gray-600 text-sm sm:text-base px-4 sm:px-0">
            Kelola layanan pernikahan Anda dengan mudah - tambah, edit, atau
            hapus layanan sesuai kebutuhan.
          </p>
        </div>

        {/* Mobile Filter Toggle */}
        <div className="md:hidden mb-4 px-4">
          <button
            onClick={toggleMobileMenu}
            className="w-full flex items-center justify-center py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-colors"
          >
            {isMobileMenuOpen ? (
              <>
                <X className="mr-2 w-5 h-5" />
                Tutup Filter
              </>
            ) : (
              <>
                <Search className="mr-2 w-5 h-5" />
                Buka Filter
              </>
            )}
          </button>
        </div>

        {/* Management Controls */}
        <div className="max-w-3xl mx-auto mb-8 sm:mb-12">
          {/* Mobile Filters Dropdown */}
          {isMobileMenuOpen && (
            <div className="md:hidden flex flex-col space-y-4 mb-4 px-4">
              {/* Search Input for Mobile */}
              <div className="relative">
                <input
                  type="text"
                  placeholder="Cari layanan..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-4 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                />
                <Search className="absolute right-3 top-3 h-5 w-5 text-gray-400" />
              </div>

              {/* Type Filter for Mobile */}
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
              >
                {typeOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Desktop Filters */}
          <div className="hidden md:flex justify-between items-center space-x-4">
            {/* Search Input */}
            <div className="relative flex-grow">
              <input
                type="text"
                placeholder="Cari layanan..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-4 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
              <Search className="absolute right-3 top-3 h-5 w-5 text-gray-400" />
            </div>

            {/* Type Filter */}
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="w-auto px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
            >
              {typeOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>

            <button
              onClick={() => setIsAddModalOpen(true)}
              className="flex items-center px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-colors"
            >
              <PlusCircle className="mr-2 w-5 h-5" />
              Tambah Layanan
            </button>
          </div>

          {/* Mobile Add Service Button */}
          <div className="md:hidden px-4 mt-4">
            <button
              onClick={() => {
                /* Nanti ditambahkan logika tambah layanan */
              }}
              className="w-full flex items-center justify-center py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-colors"
            >
              <PlusCircle className="mr-2 w-5 h-5" />
              Tambah Layanan
            </button>
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 px-4 md:px-0">
          {filteredServices.map((service) => (
            <div
              key={service.id}
              className="border border-gray-200 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
            >
              {/* Service Image */}
              <div className="h-40 sm:h-48 w-full overflow-hidden">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Service Details */}
              <div className="p-4 sm:p-6">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="text-base sm:text-xl font-semibold text-gray-800 truncate max-w-[200px]">
                      {service.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-600 truncate max-w-[200px]">
                      {service.packageName}
                    </p>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-2">
                    <button
                      onClick={() => startEditService(service)}
                      className="text-blue-500 hover:text-blue-700"
                    >
                      <Edit className="w-4 h-4 sm:w-5 sm:h-5" />
                    </button>
                    <button
                      onClick={() => handleDeleteService(service.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4 sm:w-5 sm:h-5" />
                    </button>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-gray-700 mb-3 line-clamp-3">
                  {service.description}
                </p>

                <div className="mb-3">
                  <p className="font-semibold text-xs sm:text-sm text-gray-700 mb-1">
                    Highlights:
                  </p>
                  <ul className="list-disc list-inside text-gray-600 text-xs sm:text-sm">
                    {service.highlights.slice(0, 3).map((highlight, index) => (
                      <li key={index} className="truncate">
                        {highlight}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-pink-600 font-bold text-sm sm:text-lg">
                    {new Intl.NumberFormat("id-ID", {
                      style: "currency",
                      currency: "IDR",
                    }).format(service.price)}
                  </span>
                  <span className="px-2 py-1 bg-pink-100 text-pink-800 rounded-full text-[10px] sm:text-xs">
                    {service.type === "koordinasi" ? "Koordinasi" : "Dekorasi"}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No Services Message */}
        {filteredServices.length === 0 && (
          <div className="text-center py-10 text-gray-500 px-4">
            Tidak ada layanan yang ditemukan.
          </div>
        )}

        {/* Modal Tambah Layanan */}
        <AddServiceModal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          onAddService={handleAddService}
        />

        {/* Modal Edit Layanan */}
        <EditServiceModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          serviceToEdit={serviceToEdit}
          onEditService={handleEditService}
        />
      </div>
    </div>
  );
}
