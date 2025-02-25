"use client";
import React, { useState } from "react";
import { Cormorant_Garamond } from "next/font/google";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "600"],
});

const initialTeamMembers = [
  {
    id: 1,
    name: "Amanda Putri",
    role: "Founder & Wedding Planner",
    image: "/tim.jpg",
    description:
      "Profesional berpengalaman dengan visi transformatif dalam industri wedding organizer, memimpin tim dengan strategi inovatif dan dedikasi tinggi.",
    socialMedia: {
      instagram: "https://instagram.com/amandaputri",
      linkedin: "https://linkedin.com/in/amandaputri",
    },
  },
  {
    id: 2,
    name: "Rizky Hernawan",
    role: "Senior Wedding Coordinator",
    image: "/tim.jpg",
    description:
      "Ahli koordinasi dengan ketelitian premium, mengoptimalkan setiap detail acara untuk pengalaman pernikahan yang sempurna dan tak terlupakan.",
    socialMedia: {
      instagram: "https://instagram.com/rizkyhernawan",
      linkedin: "https://linkedin.com/in/rizkyhernawan",
    },
  },
  {
    id: 3,
    name: "Siti Rahmawati",
    role: "Creative Director",
    image: "/tim.jpg",
    description:
      "Visioner desain dengan kemampuan mentransformasi konsep abstrak menjadi realitas visual yang memukau, menciptakan tema pernikahan yang unik dan personal.",
    socialMedia: {
      instagram: "https://instagram.com/sitirahmawati",
      linkedin: "https://linkedin.com/in/sitirahmawati",
    },
  },
];

const TeamManagement = () => {
  const [teamMembers, setTeamMembers] = useState(initialTeamMembers);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingMember, setEditingMember] = useState(null);

  const [newMember, setNewMember] = useState({
    name: "",
    role: "",
    description: "",
    image: "/tim.jpg",
    socialMedia: {
      instagram: "",
      linkedin: "",
    },
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name.startsWith("socialMedia.")) {
      const socialMediaField = name.split(".")[1];
      setNewMember((prev) => ({
        ...prev,
        socialMedia: {
          ...prev.socialMedia,
          [socialMediaField]: value,
        },
      }));
    } else {
      setNewMember((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const openModal = (member = null) => {
    setEditingMember(member);
    setNewMember(
      member
        ? { ...member }
        : {
            name: "",
            role: "",
            description: "",
            image: "/tim.jpg",
            socialMedia: {
              instagram: "",
              linkedin: "",
            },
          }
    );
    setIsModalOpen(true);
  };

  const addTeamMember = () => {
    if (!newMember.name || !newMember.role) {
      alert("Nama dan Posisi harus diisi");
      return;
    }

    const memberToAdd = {
      ...newMember,
      id: teamMembers.length + 1,
    };

    setTeamMembers([...teamMembers, memberToAdd]);
    setIsModalOpen(false);
  };

  const updateTeamMember = () => {
    if (!newMember.name || !newMember.role) {
      alert("Nama dan Posisi harus diisi");
      return;
    }

    setTeamMembers(
      teamMembers.map((member) =>
        member.id === editingMember.id ? newMember : member
      )
    );

    setIsModalOpen(false);
  };

  const deleteTeamMember = (id) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus anggota tim ini?")) {
      setTeamMembers(teamMembers.filter((member) => member.id !== id));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 text-gray-600">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white shadow-xl rounded-2xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-pink-500 to-rose-500 p-6 md:p-8">
            <h1
              className={`
                ${cormorant.className}
                text-3xl 
                md:text-4xl 
                font-light 
                text-white 
                text-center
                tracking-wide
              `}
            >
              Manajemen Tim Profesional
            </h1>
            <p className="text-center text-white/80 mt-2 max-w-2xl mx-auto">
              Kelola informasi dan struktur tim Anda dengan efisien dan
              profesional
            </p>
          </div>

          {/* Action Button */}
          <div className="p-4 md:p-6 bg-gray-50 border-b border-gray-200">
            <button
              onClick={() => openModal()}
              className="w-full md:w-auto bg-pink-600 text-white px-6 py-3 rounded-lg hover:bg-pink-700 transition-colors focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2"
            >
              + Tambah Anggota Tim
            </button>
          </div>

          {/* Team Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6 md:p-8">
            {teamMembers.map((member) => (
              <div
                key={member.id}
                className="bg-white border border-gray-200 rounded-xl shadow-md hover:shadow-lg transition-shadow overflow-hidden"
              >
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-16 h-16 rounded-full object-cover mr-4 border-2 border-pink-100"
                    />
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">
                        {member.name}
                      </h3>
                      <p className="text-sm text-gray-500">{member.role}</p>
                    </div>
                  </div>
                  <p className="text-gray-600 mb-4 text-sm">
                    {member.description}
                  </p>
                  <div className="flex justify-between items-center border-t border-gray-100 pt-4">
                    <div className="flex space-x-3">
                      <a
                        href={member.socialMedia.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-pink-600 hover:text-pink-800 transition-colors"
                      >
                        Instagram
                      </a>
                      <a
                        href={member.socialMedia.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-pink-600 hover:text-pink-800 transition-colors"
                      >
                        LinkedIn
                      </a>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => openModal(member)}
                        className="text-blue-500 hover:text-blue-700 text-sm"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteTeamMember(member.id)}
                        className="text-red-500 hover:text-red-700 text-sm"
                      >
                        Hapus
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-800">
                {editingMember ? "Edit Anggota Tim" : "Tambah Anggota Tim Baru"}
              </h2>
            </div>
            <form className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nama Lengkap
                </label>
                <input
                  type="text"
                  name="name"
                  value={newMember.name}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                  placeholder="Masukkan nama lengkap"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Posisi/Jabatan
                </label>
                <input
                  type="text"
                  name="role"
                  value={newMember.role}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                  placeholder="Masukkan posisi"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Deskripsi
                </label>
                <textarea
                  name="description"
                  value={newMember.description}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                  rows="4"
                  placeholder="Tuliskan deskripsi singkat"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Link Instagram
                </label>
                <input
                  type="text"
                  name="socialMedia.instagram"
                  value={newMember.socialMedia.instagram}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                  placeholder="https://instagram.com/username"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Link LinkedIn
                </label>
                <input
                  type="text"
                  name="socialMedia.linkedin"
                  value={newMember.socialMedia.linkedin}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                  placeholder="https://linkedin.com/in/username"
                />
              </div>
              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-md"
                >
                  Batalkan
                </button>
                <button
                  type="button"
                  onClick={editingMember ? updateTeamMember : addTeamMember}
                  className="px-6 py-2 bg-pink-600 text-white rounded-md hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2"
                >
                  {editingMember ? "Update" : "Tambah"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeamManagement;
