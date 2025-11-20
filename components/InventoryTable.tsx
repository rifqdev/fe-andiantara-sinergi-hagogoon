"use client";

import React from "react";
import { useInventoryStore } from "../store/inventoryStore";
import { useComputedInventory } from "../store/inventoryStore";

export default function InventoryTable() {
  const { items } = useInventoryStore();
  const {
    increaseStock,
    decreaseStock,
    sortField,
    sortDirection,
    setSortField,
  } = useInventoryStore();
  const { filteredAndSortedItems } = useComputedInventory();

  const handleIncreaseStock = (id: number, amount: number = 1) => {
    increaseStock(id, amount);
  };

  const handleDecreaseStock = (id: number, amount: number = 1) => {
    decreaseStock(id, amount);
  };

  return (
    <div className="overflow-x-auto bg-white dark:bg-taupe-950 shadow-md rounded-lg">
      <table className="min-w-full leading-normal">
        <thead>
          <tr>
            <th
              className="px-5 py-3 border-b-2 border-taupe-200 dark:border-taupe-700 bg-taupe-700 text-left text-xs font-semibold text-white uppercase tracking-wider cursor-pointer hover:bg-taupe-600 transition-colors duration-200"
              onClick={() => setSortField("name")}
            >
              <div className="flex items-center gap-2">
                Nama Barang
                {sortField === "name" && (
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    {sortDirection === "asc" ? (
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 15l7-7 7 7"
                      />
                    ) : (
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    )}
                  </svg>
                )}
              </div>
            </th>
            <th
              className="px-5 py-3 border-b-2 border-taupe-200 dark:border-taupe-700 bg-taupe-700 text-left text-xs font-semibold text-white uppercase tracking-wider cursor-pointer hover:bg-taupe-600 transition-colors duration-200"
              onClick={() => setSortField("stock")}
            >
              <div className="flex items-center gap-2">
                Stok
                {sortField === "stock" && (
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    {sortDirection === "asc" ? (
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 15l7-7 7 7"
                      />
                    ) : (
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    )}
                  </svg>
                )}
              </div>
            </th>
            <th
              className="px-5 py-3 border-b-2 border-taupe-200 dark:border-taupe-700 bg-taupe-700 text-left text-xs font-semibold text-white uppercase tracking-wider cursor-pointer hover:bg-taupe-600 transition-colors duration-200"
              onClick={() => setSortField("lastUpdate")}
            >
              <div className="flex items-center gap-2">
                Update Terakhir
                {sortField === "lastUpdate" && (
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    {sortDirection === "asc" ? (
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 15l7-7 7 7"
                      />
                    ) : (
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    )}
                  </svg>
                )}
              </div>
            </th>
            <th className="px-5 py-3 border-b-2 border-taupe-200 dark:border-taupe-700 bg-taupe-700 text-left text-xs font-semibold text-white uppercase tracking-wider">
              Aksi
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredAndSortedItems.length === 0 ? (
            <tr>
              <td
                colSpan={4}
                className="px-5 py-8 text-center text-taupe-500 dark:text-taupe-400"
              >
                {items.length === 0
                  ? "Belum ada data barang"
                  : "Tidak ada barang yang sesuai dengan pencarian"}
              </td>
            </tr>
          ) : (
            filteredAndSortedItems.map((item) => (
              <tr
                key={item.id}
                className="hover:bg-taupe-50 dark:hover:bg-taupe-700 transition-colors duration-200"
              >
                <td className="px-5 py-5 border-b border-taupe-200 dark:border-taupe-700 bg-white dark:bg-taupe-950 text-sm">
                  <div className="flex items-center">
                    <div className="ml-3">
                      <p className="capitalize text-taupe-900 dark:text-taupe-200 whitespace-no-wrap">
                        {item.name}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="px-5 py-5 border-b border-taupe-200 dark:border-taupe-700 bg-white dark:bg-taupe-950 text-sm">
                  <p className="text-taupe-900 dark:text-taupe-200 whitespace-no-wrap font-semibold">
                    {item.stock}
                  </p>
                </td>
                <td className="px-5 py-5 border-b border-taupe-200 dark:border-taupe-700 bg-white dark:bg-taupe-950 text-sm">
                  <p className="text-taupe-900 dark:text-taupe-200 whitespace-no-wrap">
                    {item.lastUpdate}
                  </p>
                </td>
                <td className="px-5 py-5 border-b border-taupe-200 dark:border-taupe-700 bg-white dark:bg-taupe-950 text-sm">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleIncreaseStock(item.id)}
                      className="bg-taupe-500 hover:bg-taupe-600 text-white text-xs font-medium py-1 px-3 rounded transition-colors duration-200"
                    >
                      Tambah Stok
                    </button>
                    <button
                      onClick={() => handleDecreaseStock(item.id)}
                      className="bg-taupe-700 hover:bg-taupe-800 text-white text-xs font-medium py-1 px-3 rounded transition-colors duration-200"
                      disabled={item.stock <= 0}
                    >
                      Kurangi Stok
                    </button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
