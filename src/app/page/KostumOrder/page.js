"use client";
import React, { useState } from "react";
import Link from "next/link";
import { X, Plus, Search } from "lucide-react";

const CustomPackageModal = ({ isOpen, onClose }) => {
  // Predefined features list
  const availableFeatures = [
    {
      id: 1,
      name: "Dekorasi Premium",
      price: 15000000,
      description: "Dekorasi mewah dengan bunga segar dan lighting",
    },
    {
      id: 2,
      name: "Catering 500 Porsi",
      price: 75000000,
      description: "Paket catering premium dengan 8 menu utama",
    },
    {
      id: 3,
      name: "Dokumentasi Lengkap",
      price: 25000000,
      description: "2 fotografer, 1 videografer, drone shot",
    },
    {
      id: 4,
      name: "Entertainment Band",
      price: 20000000,
      description: "Live music band dengan 6 personil",
    },
    {
      id: 5,
      name: "Wedding Organizer",
      price: 35000000,
      description: "Koordinasi penuh H-3 sampai hari H",
    },
  ];

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFeatures, setSelectedFeatures] = useState([]);

  // Filter features based on search term
  const filteredFeatures = availableFeatures.filter((feature) =>
    feature.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Toggle feature selection
  const toggleFeature = (feature) => {
    if (selectedFeatures.find((f) => f.id === feature.id)) {
      setSelectedFeatures(selectedFeatures.filter((f) => f.id !== feature.id));
    } else {
      setSelectedFeatures([...selectedFeatures, feature]);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-white rounded-lg overflow-hidden shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 bg-gray-200 rounded-full p-2 z-10 hover:bg-gray-300 transition"
        >
          <X className="w-6 h-6 text-gray-700" />
        </button>

        <div className="flex flex-col md:flex-row h-full max-h-[85vh]">
          {/* Left Side - Feature Selection */}
          <div className="w-full md:w-1/2 bg-pink-50 p-6 md:p-8 overflow-y-auto">
            <h2 className="text-2xl font-semibold text-black mb-6">
              Buat Paket Kustom Anda
            </h2>

            {/* Search Bar */}
            <div className="relative mb-4">
              <input
                type="text"
                placeholder="Cari fitur..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 pl-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
              <Search className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" />
            </div>

            {/* Available Features List */}
            <div className="space-y-3 mb-6">
              <h3 className="text-lg font-medium text-gray-700 mb-3">
                Pilih Fitur Yang Anda Inginkan
              </h3>

              {filteredFeatures.map((feature) => (
                <div
                  key={feature.id}
                  className={`bg-white p-4 rounded-lg shadow-sm cursor-pointer transition ${
                    selectedFeatures.find((f) => f.id === feature.id)
                      ? "border-2 border-pink-500"
                      : "border border-gray-200"
                  }`}
                  onClick={() => toggleFeature(feature)}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium text-gray-800">
                        {feature.name}
                      </h4>
                      <p className="text-sm text-gray-600 mt-1">
                        {feature.description}
                      </p>
                    </div>
                    <p className="text-pink-600 font-semibold">
                      Rp {feature.price.toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Selected Features Summary */}
            <div className="bg-white p-4 rounded-lg shadow-sm mb-4">
              <h3 className="text-lg font-semibold text-gray-700 mb-2">
                Fitur Yang Dipilih
              </h3>
              {selectedFeatures.length === 0 ? (
                <p className="text-gray-500 text-sm">
                  Belum ada fitur yang dipilih
                </p>
              ) : (
                <div className="space-y-2">
                  {selectedFeatures.map((feature) => (
                    <div
                      key={feature.id}
                      className="flex justify-between text-sm"
                    >
                      <span className="text-gray-700">{feature.name}</span>
                      <span className="text-pink-600">
                        Rp {feature.price.toLocaleString()}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Total Estimation */}
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold text-gray-700 mb-2">
                Estimasi Total
              </h3>
              <p className="text-2xl font-bold text-pink-600">
                Rp{" "}
                {selectedFeatures
                  .reduce((total, feature) => total + feature.price, 0)
                  .toLocaleString()}
              </p>
            </div>
          </div>

          {/* Right Side - Contact Form */}
          <div className="w-full md:w-1/2 p-6 md:p-8 overflow-y-auto">
            <h3 className="text-xl md:text-2xl font-semibold mb-6 text-center">
              Form Pemesanan
            </h3>

            <form className="space-y-4">
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
                      required
                      className="w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-pink-500"
                    />
                  </div>
                </div>
              </div>

              {/* Informasi Acara */}
              <div className="border-b pb-4 mb-4">
                <h4 className="text-lg font-semibold mb-3">Informasi Acara</h4>
                <div className="space-y-3">
                  <div>
                    <label className="block text-gray-700 mb-1 text-sm">
                      Tanggal Pernikahan
                    </label>
                    <input
                      type="date"
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
                      placeholder="Nama gedung/tempat acara"
                      required
                      className="w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-pink-500 mb-2"
                    />
                    <textarea
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
                <h4 className="text-lg font-semibold mb-3">Informasi Kontak</h4>
                <div className="space-y-3">
                  <div>
                    <label className="block text-gray-700 mb-1 text-sm">
                      Email
                    </label>
                    <input
                      type="email"
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
                      className="w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-pink-500"
                    />
                  </div>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex justify-between space-x-4 pt-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="w-full bg-gray-200 text-gray-700 px-4 py-2 rounded-md text-sm hover:bg-gray-300 transition"
                >
                  Batal
                </button>
                <Link href="/page/DetailPembayaran">
                  <button
                    type="submit"
                    className="w-full bg-pink-600 text-white px-4 py-2 rounded-md text-sm hover:bg-pink-700 transition disabled:bg-pink-300 disabled:cursor-not-allowed"
                    disabled={selectedFeatures.length === 0}
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
  );
};

export default CustomPackageModal;
