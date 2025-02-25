"use client";
import React, { useState, useEffect } from "react";
import { Edit, X } from "lucide-react";

const EditServiceModal = ({
  isOpen,
  onClose,
  serviceToEdit,
  onEditService,
}) => {
  const [editedService, setEditedService] = useState({
    title: "",
    packageName: "",
    description: "",
    highlights: ["", "", "", "", ""],
    image: null, // Change from "" to null
    price: "",
    type: "koordinasi",
  });
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    if (serviceToEdit) {
      const paddedHighlights = [
        ...serviceToEdit.highlights,
        ...Array(5 - serviceToEdit.highlights.length).fill(""),
      ];

      setEditedService({
        ...serviceToEdit,
        price: serviceToEdit.price.toString(),
        highlights: paddedHighlights,
        image: null, // Reset to null since we'll be handling new file uploads
      });

      // Set the existing image URL as preview
      setImagePreview(serviceToEdit.image);
    }
  }, [serviceToEdit]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedService((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleHighlightChange = (index, value) => {
    const updatedHighlights = [...editedService.highlights];
    updatedHighlights[index] = value;
    setEditedService((prev) => ({
      ...prev,
      highlights: updatedHighlights,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Remove empty highlights
    const filteredHighlights = editedService.highlights.filter(
      (h) => h.trim() !== ""
    );

    const serviceToUpdate = {
      ...editedService,
      price: parseFloat(editedService.price),
      highlights: filteredHighlights,
    };

    onEditService(serviceToUpdate);
    onClose();
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setEditedService((prev) => ({
        ...prev,
        image: file,
      }));

      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center text-gray-600">
      <div className="bg-white rounded-lg w-full max-w-md mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-xl font-semibold text-gray-800">Edit Layanan</h2>
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
              value={editedService.title}
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
              value={editedService.packageName}
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
              value={editedService.description}
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
            {editedService.highlights.map((highlight, index) => (
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
                      setEditedService((prev) => ({ ...prev, image: null }));
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
              value={editedService.price}
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
              value={editedService.type}
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
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Edit className="mr-2 w-5 h-5 inline-block" />
              Simpan Perubahan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditServiceModal;
