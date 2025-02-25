"use client";
import React, { useState } from "react";
import { PlusCircle, X } from "lucide-react";

const AddServiceModal = ({ isOpen, onClose, onAddService }) => {
  const [newService, setNewService] = useState({
    title: "",
    packageName: "",
    description: "",
    highlights: ["", "", "", "", ""],
    image: null,
    price: "",
    type: "koordinasi",
  });
  const [imagePreview, setImagePreview] = useState(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewService((prev) => ({
        ...prev,
        image: file,
      }));

      // Create preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewService((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleHighlightChange = (index, value) => {
    const updatedHighlights = [...newService.highlights];
    updatedHighlights[index] = value;
    setNewService((prev) => ({
      ...prev,
      highlights: updatedHighlights,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Remove empty highlights
    const filteredHighlights = newService.highlights.filter(
      (h) => h.trim() !== ""
    );

    const serviceToAdd = {
      ...newService,
      id: Date.now(), // Generate unique ID
      price: parseFloat(newService.price),
      highlights: filteredHighlights,
    };

    onAddService(serviceToAdd);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center text-gray-600">
      <div className="bg-white rounded-lg w-full max-w-md mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-xl font-semibold text-gray-800">
            Tambah Layanan Baru
          </h2>
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-gray-800"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Judul Layanan
            </label>
            <input
              type="text"
              name="title"
              value={newService.title}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nama Paket
            </label>
            <input
              type="text"
              name="packageName"
              value={newService.packageName}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Deskripsi
            </label>
            <textarea
              name="description"
              value={newService.description}
              onChange={handleInputChange}
              required
              rows="4"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Highlights (maks 5)
            </label>
            {newService.highlights.map((highlight, index) => (
              <input
                key={index}
                type="text"
                value={highlight}
                onChange={(e) => handleHighlightChange(index, e.target.value)}
                placeholder={`Highlight ${index + 1}`}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 mb-2"
              />
            ))}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Gambar
            </label>
            <div className="mt-1 flex items-center gap-4">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="block w-full text-sm text-gray-500
        file:mr-4 file:py-2 file:px-4
        file:rounded-lg file:border-0
        file:text-sm file:font-semibold
        file:bg-pink-50 file:text-pink-700
        hover:file:bg-pink-100
        focus:outline-none"
              />
              {imagePreview && (
                <div className="relative w-20 h-20">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-full h-full object-cover rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setImagePreview(null);
                      setNewService((prev) => ({ ...prev, image: null }));
                    }}
                    className="absolute -top-2 -right-2 bg-white rounded-full p-1 shadow-md hover:bg-gray-100"
                  >
                    <X className="w-4 h-4 text-gray-600" />
                  </button>
                </div>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Harga (IDR)
            </label>
            <input
              type="number"
              name="price"
              value={newService.price}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tipe Layanan
            </label>
            <select
              name="type"
              value={newService.type}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
            >
              <option value="koordinasi">Koordinasi</option>
              <option value="dekorasi">Dekorasi</option>
            </select>
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-colors"
            >
              <PlusCircle className="mr-2 w-5 h-5 inline-block" />
              Tambah Layanan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddServiceModal;
