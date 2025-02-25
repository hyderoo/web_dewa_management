import React from "react";

const ServiceDetailModal = ({ isOpen, onClose, service }) => {
  if (!isOpen || !service) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={onClose}
      ></div>

      {/* Modal */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative w-full max-w-2xl transform rounded-lg bg-white p-6 text-left shadow-xl transition-all">
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute right-4 top-4 text-gray-400 hover:text-gray-500"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          {/* Content */}
          <div>
            <h2 className="text-3xl font-light text-gray-900 mb-4">
              {service.title}
            </h2>

            <h3 className="text-xl font-medium text-gray-800 mb-4">
              {service.packageName}
            </h3>

            <div className="mt-4">
              <div className="aspect-video w-full overflow-hidden rounded-lg mb-6">
                <img
                  src={service.image}
                  alt={service.packageName}
                  className="h-full w-full object-cover"
                />
              </div>

              <div className="mt-4">
                <p className="text-2xl font-semibold text-pink-600 mb-4">
                  {new Intl.NumberFormat("id-ID", {
                    style: "currency",
                    currency: "IDR",
                  }).format(service.price)}
                </p>

                <p className="mt-4 text-gray-600 leading-relaxed mb-6">
                  {service.description}
                </p>

                {/* Highlights Section */}
                {service.highlights && service.highlights.length > 0 && (
                  <div className="mb-6">
                    <h4 className="text-lg font-semibold text-gray-800 mb-3">
                      Highlights Layanan
                    </h4>
                    <ul className="space-y-2 text-gray-600 list-disc list-inside">
                      {service.highlights.map((highlight, index) => (
                        <li key={index} className="text-sm">
                          {highlight}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetailModal;
