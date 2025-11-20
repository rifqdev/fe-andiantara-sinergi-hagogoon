"use client";

import React, { useState } from "react";

interface AddItemModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddItem: (name: string, stock: number) => void;
}

export default function AddItemModal({
  isOpen,
  onClose,
  onAddItem,
}: AddItemModalProps) {
  const [newItem, setNewItem] = useState<{ name: string; stock: string }>({
    name: "",
    stock: "",
  });

  const handleAddItem = () => {
    if (newItem.name.trim() && newItem.stock !== "") {
      const stockValue = parseInt(newItem.stock);
      if (!isNaN(stockValue) && stockValue >= 0) {
        onAddItem(newItem.name.trim(), stockValue);
        setNewItem({
          name: "",
          stock: "",
        });
        onClose();
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-taupe-950 rounded-lg p-6 w-96 max-w-full mx-4">
        <h2 className="text-xl font-bold mb-4 text-taupe-900 dark:text-taupe-100">
          Tambah Barang Baru
        </h2>

        <div className="mb-4">
          <label className="block text-sm font-medium text-taupe-700 dark:text-taupe-300 mb-2">
            Nama Barang
          </label>
          <input
            type="text"
            value={newItem.name}
            onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
            className="w-full px-3 py-2 border border-taupe-300 dark:border-taupe-600 rounded-md focus:outline-none focus:ring-2 focus:ring-taupe-500 dark:bg-taupe-900 dark:text-taupe-100"
            placeholder="Masukkan nama barang"
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-taupe-700 dark:text-taupe-300 mb-2">
            Stok
          </label>
          <input
            type="number"
            value={newItem.stock}
            onChange={(e) =>
              setNewItem({
                ...newItem,
                stock: e.target.value,
              })
            }
            className="w-full px-3 py-2 border border-taupe-300 dark:border-taupe-600 rounded-md focus:outline-none focus:ring-2 focus:ring-taupe-500 dark:bg-taupe-900 dark:text-taupe-100"
            placeholder="Masukkan jumlah stok"
            min="0"
          />
        </div>

        <div className="flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-taupe-600 dark:text-taupe-300 bg-taupe-200 dark:bg-taupe-700 rounded-md hover:bg-taupe-300 dark:hover:bg-taupe-600 transition-colors duration-200"
          >
            Batal
          </button>
          <button
            onClick={handleAddItem}
            className="px-4 py-2 bg-taupe-600 text-white rounded-md hover:bg-taupe-700 transition-colors duration-200"
          >
            Tambah
          </button>
        </div>
      </div>
    </div>
  );
}
