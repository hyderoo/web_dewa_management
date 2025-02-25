"use client";
import React, { useState, useRef } from "react";
import {
  PlusCircle,
  Edit2,
  Trash2,
  Image as ImageIcon,
  Save,
  X,
} from "lucide-react";

const PortfolioManagement = () => {
  const fileInputRef = useRef(null);
  const [portfolioItems, setPortfolioItems] = useState([
    {
      id: 1,
      title: "Pernikahan Adat Jawa Elegan",
      category: "Pernikahan Adat",
      image: "/nikah.jpg",
      description: "Upacara sakral dengan nuansa tradisional yang memukau",
    },
  ]);

  const [editingItem, setEditingItem] = useState(null);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);

  const categories = [
    "Pernikahan Adat",
    "Pernikahan Modern",
    "Intimate Wedding",
    "Destination Wedding",
  ];

  const handleEdit = (item) => {
    setEditingItem({ ...item });
    setImagePreview(item.image);
    setIsAddingNew(false);
  };

  const handleAdd = () => {
    setEditingItem({
      id: Date.now(),
      title: "",
      category: categories[0],
      image: "",
      description: "",
    });
    setImagePreview(null);
    setIsAddingNew(true);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Create a preview URL for the selected image
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);

      // In a real application, you would typically upload the file to a server here
      // For this example, we'll just use the preview URL
      setEditingItem({
        ...editingItem,
        image: previewUrl,
      });
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  const handleSave = () => {
    if (isAddingNew) {
      setPortfolioItems([...portfolioItems, editingItem]);
    } else {
      setPortfolioItems(
        portfolioItems.map((item) =>
          item.id === editingItem.id ? editingItem : item
        )
      );
    }
    setEditingItem(null);
    setIsAddingNew(false);
    setImagePreview(null);
  };

  const handleDelete = (id) => {
    setPortfolioItems(portfolioItems.filter((item) => item.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8 text-gray-600">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900">
            Manajemen Portofolio
          </h1>
          <button
            onClick={handleAdd}
            className="inline-flex items-center px-4 py-2 bg-pink-500 hover:bg-pink-600 text-white rounded-lg transition-colors duration-200"
          >
            <PlusCircle className="w-4 h-4 mr-2" />
            Tambah Portfolio
          </button>
        </div>

        {/* Edit/Add Modal */}
        {editingItem && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900">
                  {isAddingNew ? "Tambah Portfolio Baru" : "Edit Portfolio"}
                </h2>
              </div>

              <div className="p-6">
                <form className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Judul
                    </label>
                    <input
                      type="text"
                      value={editingItem.title}
                      onChange={(e) =>
                        setEditingItem({
                          ...editingItem,
                          title: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                      placeholder="Masukkan judul portfolio"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Kategori
                    </label>
                    <select
                      value={editingItem.category}
                      onChange={(e) =>
                        setEditingItem({
                          ...editingItem,
                          category: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    >
                      {categories.map((category) => (
                        <option key={category} value={category}>
                          {category}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Deskripsi
                    </label>
                    <textarea
                      value={editingItem.description}
                      onChange={(e) =>
                        setEditingItem({
                          ...editingItem,
                          description: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                      placeholder="Masukkan deskripsi portfolio"
                      rows={4}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Gambar
                    </label>
                    <div className="flex items-center space-x-4">
                      <div className="w-32 h-32 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center overflow-hidden">
                        {imagePreview ? (
                          <img
                            src={imagePreview}
                            alt="Preview"
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <ImageIcon className="w-8 h-8 text-gray-400" />
                        )}
                      </div>
                      <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleImageUpload}
                        accept="image/*"
                        className="hidden"
                      />
                      <button
                        type="button"
                        onClick={triggerFileInput}
                        className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                      >
                        Upload Gambar
                      </button>
                    </div>
                  </div>

                  <div className="flex justify-end space-x-4 mt-6">
                    <button
                      type="button"
                      onClick={() => {
                        setEditingItem(null);
                        setIsAddingNew(false);
                        setImagePreview(null);
                      }}
                      className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent inline-flex items-center"
                    >
                      <X className="w-4 h-4 mr-2" />
                      Batal
                    </button>
                    <button
                      type="button"
                      onClick={handleSave}
                      className="px-4 py-2 bg-pink-500 hover:bg-pink-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 inline-flex items-center"
                    >
                      <Save className="w-4 h-4 mr-2" />
                      Simpan
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}

        {/* Portfolio List */}
        <div className="space-y-6">
          {portfolioItems.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <div className="flex flex-col sm:flex-row">
                <div className="w-full sm:w-48 h-48">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900">
                        {item.title}
                      </h3>
                      <span className="inline-block bg-pink-100 text-pink-800 text-sm px-2 py-1 rounded-full mt-2">
                        {item.category}
                      </span>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEdit(item)}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  <p className="mt-4 text-gray-600">{item.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PortfolioManagement;
