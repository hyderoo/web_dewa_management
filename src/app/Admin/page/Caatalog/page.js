"use client";
import React, { useState } from "react";
import { Plus, Edit2, Trash2, Search, Upload, X, List } from "lucide-react";
import CustomFeatureManagement from "./CustomFeatureManagement";

const CatalogManagement = () => {
  const [services, setServices] = useState([
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
    // ... other initial services
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [currentFeature, setCurrentFeature] = useState("");
  const [showCustomFeatures, setShowCustomFeatures] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    features: [],
    type: "all-in-one",
    image: "/pernikahan.jpg",
  });

  const serviceTypes = [
    { value: "all-in-one", label: "Paket Lengkap" },
    { value: "decoration", label: "Dekorasi" },
    { value: "documentation", label: "Dokumentasi" },
  ];

  const handleAddNew = () => {
    setSelectedService(null);
    setFormData({
      name: "",
      description: "",
      price: "",
      features: [],
      type: "all-in-one",
      image: "/pernikahan.jpg",
    });
    setShowModal(true);
  };

  const handleEdit = (service) => {
    setSelectedService(service);
    setFormData({
      ...service,
    });
    setShowModal(true);
  };

  const handleAddFeature = () => {
    if (currentFeature.trim()) {
      setFormData({
        ...formData,
        features: [...formData.features, currentFeature.trim()],
      });
      setCurrentFeature("");
    }
  };

  const handleRemoveFeature = (index) => {
    setFormData({
      ...formData,
      features: formData.features.filter((_, i) => i !== index),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedService) {
      setServices(
        services.map((s) => (s.name === selectedService.name ? formData : s))
      );
    } else {
      setServices([...services, formData]);
    }
    setShowModal(false);
  };

  const handleDelete = (name) => {
    if (confirm("Are you sure you want to delete this service?")) {
      setServices(services.filter((s) => s.name !== name));
    }
  };

  const filteredServices = services.filter(
    (service) =>
      service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8 text-gray-600">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-semibold text-gray-800 mb-2">
          Manajemen Katalog Layanan
        </h1>
        <p className="text-gray-600">Kelola paket dan layanan pernikahan</p>
      </div>

      {/* Actions Bar */}
      <div className="mb-6 flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        <div className="relative w-full sm:w-64">
          <input
            type="text"
            placeholder="Cari layanan..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
          />
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
        </div>

        <div className="w-full sm:w-auto flex gap-2">
          <button
            onClick={handleAddNew}
            className="flex-1 sm:flex-none px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-colors flex items-center justify-center gap-2"
          >
            <Plus className="h-5 w-5" />
            Tambah Layanan Baru
          </button>

          <button
            onClick={() => setShowCustomFeatures(true)}
            className="flex-1 sm:flex-none px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center justify-center gap-2"
          >
            <List className="h-5 w-5" />
            Fitur Custom
          </button>
        </div>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredServices.map((service) => (
          <div
            key={service.name}
            className="bg-white rounded-lg shadow-md overflow-hidden"
          >
            <img
              src={service.image}
              alt={service.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="font-semibold text-lg text-gray-800 mb-2">
                {service.name}
              </h3>
              <p className="text-gray-600 text-sm mb-2">
                {service.description}
              </p>
              <p className="font-semibold text-pink-600 mb-3">
                {service.price}
              </p>

              <div className="mb-3">
                <span className="px-2 py-1 bg-pink-100 text-pink-800 text-sm rounded-full">
                  {serviceTypes.find((t) => t.value === service.type)?.label}
                </span>
              </div>

              <div className="mb-4">
                <h4 className="font-medium mb-2">Fitur:</h4>
                <ul className="space-y-1">
                  {service.features.map((feature, index) => (
                    <li
                      key={index}
                      className="text-sm text-gray-600 flex items-center gap-2"
                    >
                      <span className="text-pink-500">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(service)}
                  className="flex-1 px-3 py-1.5 bg-gray-100 text-gray-600 rounded hover:bg-gray-200 transition-colors flex items-center justify-center gap-1"
                >
                  <Edit2 className="h-4 w-4" />
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(service.name)}
                  className="flex-1 px-3 py-1.5 bg-red-50 text-red-600 rounded hover:bg-red-100 transition-colors flex items-center justify-center gap-1"
                >
                  <Trash2 className="h-4 w-4" />
                  Hapus
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center p-4 border-b">
              <h2 className="text-xl font-semibold">
                {selectedService ? "Edit Layanan" : "Tambah Layanan Baru"}
              </h2>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-4">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nama Layanan
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Deskripsi
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    rows="3"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Harga
                  </label>
                  <input
                    type="text"
                    value={formData.price}
                    onChange={(e) =>
                      setFormData({ ...formData, price: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Tipe Layanan
                  </label>
                  <select
                    value={formData.type}
                    onChange={(e) =>
                      setFormData({ ...formData, type: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  >
                    {serviceTypes.map((type) => (
                      <option key={type.value} value={type.value}>
                        {type.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Fitur-fitur
                  </label>
                  <div className="flex gap-2 mb-2">
                    <input
                      type="text"
                      value={currentFeature}
                      onChange={(e) => setCurrentFeature(e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                      placeholder="Tambah fitur baru"
                    />
                    <button
                      type="button"
                      onClick={handleAddFeature}
                      className="px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-colors"
                    >
                      Tambah
                    </button>
                  </div>
                  <ul className="space-y-2">
                    {formData.features.map((feature, index) => (
                      <li
                        key={index}
                        className="flex items-center justify-between bg-gray-50 p-2 rounded"
                      >
                        <span>{feature}</span>
                        <button
                          type="button"
                          onClick={() => handleRemoveFeature(index)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Gambar
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                    <Upload className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                    <p className="text-sm text-gray-600">
                      Klik untuk memilih gambar atau drop file di sini
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-colors"
                >
                  {selectedService ? "Simpan Perubahan" : "Tambah Layanan"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showCustomFeatures && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg w-full h-full max-w-7xl max-h-[90vh] overflow-hidden">
            <div className="h-full flex flex-col">
              <div className="flex justify-between items-center p-4 border-b">
                <h2 className="text-xl font-semibold">
                  Manajemen Fitur Custom
                </h2>
                <button
                  onClick={() => setShowCustomFeatures(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
              <div className="flex-1 overflow-auto">
                <CustomFeatureManagement />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CatalogManagement;
