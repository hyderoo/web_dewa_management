"use client";
import React, { useState } from "react";
import { Calendar } from "lucide-react";

const WeddingCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const bookedDates = [
    "2024-12-21",
    "2024-12-22",
    "2024-12-25",
    "2024-12-28",
    "2024-12-29",
  ];

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const months = [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember",
  ];

  const handlePrevMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1)
    );
  };

  const handleNextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1)
    );
  };

  const isDateBooked = (year, month, day) => {
    const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(
      day
    ).padStart(2, "0")}`;
    return bookedDates.includes(dateStr);
  };

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);
    const days = [];

    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="h-8 md:h-12 lg:h-16"></div>);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const isBooked = isDateBooked(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        day
      );

      days.push(
        <div
          key={day}
          className={`
            h-8 md:h-12 lg:h-16 flex items-center justify-center rounded-lg
            text-sm md:text-base lg:text-lg relative
            ${isBooked ? "bg-red-100" : "bg-green-50"}
          `}
        >
          <span className="relative z-10">{day}</span>
          {isBooked && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-xs md:text-sm text-red-600 font-medium">
                Booked
              </div>
            </div>
          )}
        </div>
      );
    }

    return days;
  };

  return (
    <div className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl mx-auto bg-white rounded-xl shadow-lg p-4 md:p-6 text-gray-600">
      <div className="flex items-center justify-between mb-4 md:mb-6">
        <div className="flex items-center space-x-2">
          <Calendar className="h-5 w-5 md:h-6 md:w-6 text-pink-600" />
          <h2 className="text-lg md:text-xl font-semibold text-gray-800">
            Jadwal Pernikahan
          </h2>
        </div>
        <div className="flex items-center space-x-2 md:space-x-4">
          <button
            onClick={handlePrevMonth}
            className="p-1 md:p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <svg
              className="w-4 h-4 md:w-5 md:h-5 text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <span className="text-sm md:text-base font-medium text-gray-800">
            {months[currentDate.getMonth()]} {currentDate.getFullYear()}
          </span>
          <button
            onClick={handleNextMonth}
            className="p-1 md:p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <svg
              className="w-4 h-4 md:w-5 md:h-5 text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-1 mb-2">
        {["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"].map((day) => (
          <div
            key={day}
            className="h-6 md:h-8 flex items-center justify-center font-medium text-gray-600 text-xs md:text-sm"
          >
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">{renderCalendar()}</div>

      <div className="mt-4 md:mt-6 space-y-2">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 md:w-4 md:h-4 bg-red-100 rounded"></div>
          <span className="text-xs md:text-sm text-gray-600">
            Tanggal Sudah Dipesan
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 md:w-4 md:h-4 bg-green-50 rounded"></div>
          <span className="text-xs md:text-sm text-gray-600">
            Tanggal Tersedia
          </span>
        </div>
      </div>
    </div>
  );
};

export default WeddingCalendar;
