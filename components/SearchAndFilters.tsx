"use client";

import React from "react";
import { useInventoryStore } from "../store/inventoryStore";
import SortIcon from "./ui/icons/SortIcon";

export default function SearchAndFilters() {
  const {
    searchTerm,
    setSearchTerm,
    sortField,
    sortDirection,
    setSortField,
    itemsPerPage,
    setItemsPerPage,
  } = useInventoryStore();

  return (
    <div className="bg-white dark:bg-taupe-950 rounded-lg shadow-md p-4 mb-6">
      <div className="flex flex-col md:flex-row gap-4">
        {/* Search Input */}
        <div className="flex-1">
          <label className="block text-sm font-medium text-taupe-700 dark:text-taupe-300 mb-2">
            Cari Barang
          </label>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-3 py-2 border border-taupe-300 dark:border-taupe-600 rounded-md focus:outline-none focus:ring-2 focus:ring-taupe-500 dark:bg-taupe-900 dark:text-taupe-100"
            placeholder="Masukkan nama barang..."
          />
        </div>

        {/* Sort Controls */}
        <div className="md:w-48">
          <label className="block text-sm font-medium text-taupe-700 dark:text-taupe-300 mb-2">
            Urutkan
          </label>
          <select
            value={sortField}
            onChange={(e) => setSortField(e.target.value as any)}
            className="w-full px-3 py-2 border border-taupe-300 dark:border-taupe-600 rounded-md focus:outline-none focus:ring-2 focus:ring-taupe-500 dark:bg-taupe-900 dark:text-taupe-100"
          >
            <option value="name">Nama</option>
            <option value="stock">Stok</option>
            <option value="lastUpdate">Update Terakhir</option>
          </select>
        </div>

        {/* Items Per Page */}
        <div className="md:w-32">
          <label className="block text-sm font-medium text-taupe-700 dark:text-taupe-300 mb-2">
            Per Halaman
          </label>
          <select
            value={itemsPerPage}
            onChange={(e) => setItemsPerPage(Number(e.target.value))}
            className="w-full px-3 py-2 border border-taupe-300 dark:border-taupe-600 rounded-md focus:outline-none focus:ring-2 focus:ring-taupe-500 dark:bg-taupe-900 dark:text-taupe-100"
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
          </select>
        </div>

        {/* Sort Direction Indicator */}
        <div className="flex items-end">
          <button
            onClick={() => setSortField(sortField)}
            className="px-4 py-2 bg-taupe-600 hover:bg-taupe-700 text-white rounded-md transition-colors duration-200 flex items-center gap-2"
          >
            <SortIcon direction={sortDirection} />
            {sortDirection === "asc" ? "A-Z" : "Z-A"}
          </button>
        </div>
      </div>
    </div>
  );
}
