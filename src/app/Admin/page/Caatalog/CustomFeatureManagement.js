"use client";
import React, { useState } from "react";
import { Plus, Edit2, Trash2, Search, X } from "lucide-react";

const CustomFeatureManagement = () => {
  const [features, setFeatures] = useState([
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
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedFeature, setSelectedFeature] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
  });

  const handleAddNew = () => {
    setSelectedFeature(null);
    setFormData({
      name: "",
      price: "",
      description: "",
    });
    setShowModal(true);
  };

  const handleEdit = (feature) => {
    setSelectedFeature(feature);
    setFormData({
      ...feature,
      price: feature.price,
    });
    setShowModal(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newFeature = {
      ...formData,
      id: selectedFeature ? selectedFeature.id : Date.now(),
      price: Number(formData.price),
    };

    if (selectedFeature) {
      setFeatures(
        features.map((f) => (f.id === selectedFeature.id ? newFeature : f))
      );
    } else {
      setFeatures([...features, newFeature]);
    }
    setShowModal(false);
  };

  const handleDelete = (id) => {
    if (confirm("Apakah Anda yakin ingin menghapus fitur ini?")) {
      setFeatures(features.filter((f) => f.id !== id));
    }
  };

  const filteredFeatures = features.filter(
    (feature) =>
      feature.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      feature.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-semibold text-gray-800 mb-2">
          Manajemen Fitur Custom
        </h1>
        <p className="text-gray-600">
          Kelola fitur-fitur custom untuk paket pernikahan
        </p>
      </div>

      {/* Actions Bar */}
      <div className="mb-6 flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        <div className="relative w-full sm:w-64">
          <input
            type="text"
            placeholder="Cari fitur..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
          />
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
        </div>

        <button
          onClick={handleAddNew}
          className="w-full sm:w-auto px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-colors flex items-center justify-center gap-2"
        >
          <Plus className="h-5 w-5" />
          Tambah Fitur Baru
        </button>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredFeatures.map((feature) => (
          <div
            key={feature.id}
            className="bg-white rounded-lg shadow-md overflow-hidden p-4"
          >
            <div className="mb-4">
              <h3 className="font-semibold text-lg text-gray-800 mb-2">
                {feature.name}
              </h3>
              <p className="text-gray-600 text-sm mb-2">
                {feature.description}
              </p>
              <p className="font-semibold text-pink-600">
                Rp {feature.price.toLocaleString()}
              </p>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => handleEdit(feature)}
                className="flex-1 px-3 py-1.5 bg-gray-100 text-gray-600 rounded hover:bg-gray-200 transition-colors flex items-center justify-center gap-1"
              >
                <Edit2 className="h-4 w-4" />
                Edit
              </button>
              <button
                onClick={() => handleDelete(feature.id)}
                className="flex-1 px-3 py-1.5 bg-red-50 text-red-600 rounded hover:bg-red-100 transition-colors flex items-center justify-center gap-1"
              >
                <Trash2 className="h-4 w-4" />
                Hapus
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg w-full max-w-md">
            <div className="flex justify-between items-center p-4 border-b">
              <h2 className="text-xl font-semibold">
                {selectedFeature ? "Edit Fitur" : "Tambah Fitur Baru"}
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
                    Nama Fitur
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
                    Harga
                  </label>
                  <input
                    type="number"
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
                  {selectedFeature ? "Simpan Perubahan" : "Tambah Fitur"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomFeatureManagement;
