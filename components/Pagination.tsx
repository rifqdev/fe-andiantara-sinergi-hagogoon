"use client";

import React from "react";
import { useInventoryStore } from "../store/inventoryStore";
import { useComputedInventory } from "../store/inventoryStore";

export default function Pagination() {
  const { currentPage, setCurrentPage } = useInventoryStore();
  const { totalPages, totalItems, startIndex, endIndex } = useComputedInventory();

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Generate page numbers
  const getVisiblePages = () => {
    const pages = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      const startPage = Math.max(1, currentPage - 2);
      const endPage = Math.min(totalPages, startPage + maxVisible - 1);

      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }
    }

    return pages;
  };

  if (totalPages <= 1) return null;

  return (
    <div className="bg-white dark:bg-taupe-950 rounded-lg shadow-md p-4 mt-6">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        {/* Page Info */}
        <div className="text-sm text-taupe-600 dark:text-taupe-300">
          Menampilkan {startIndex + 1}-{Math.min(endIndex, totalItems)} dari{" "}
          {totalItems} item
        </div>

        {/* Pagination Controls */}
        <div className="flex items-center gap-2">
          {/* Previous Button */}
          <button
            onClick={handlePrevious}
            disabled={currentPage === 1}
            className="px-3 py-2 bg-taupe-100 hover:bg-taupe-200 dark:bg-taupe-800 dark:hover:bg-taupe-700 text-taupe-700 dark:text-taupe-300 rounded-md transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            &laquo; Sebelumnya
          </button>

          {/* Page Numbers */}
          <div className="flex items-center gap-1">
            {getVisiblePages().map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`px-3 py-2 rounded-md transition-colors duration-200 ${
                  currentPage === page
                    ? "bg-taupe-600 text-white"
                    : "bg-taupe-100 hover:bg-taupe-200 dark:bg-taupe-800 dark:hover:bg-taupe-700 text-taupe-700 dark:text-taupe-300"
                }`}
              >
                {page}
              </button>
            ))}
          </div>

          {/* Next Button */}
          <button
            onClick={handleNext}
            disabled={currentPage === totalPages}
            className="px-3 py-2 bg-taupe-100 hover:bg-taupe-200 dark:bg-taupe-800 dark:hover:bg-taupe-700 text-taupe-700 dark:text-taupe-300 rounded-md transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Berikutnya &raquo;
          </button>
        </div>
      </div>
    </div>
  );
}
