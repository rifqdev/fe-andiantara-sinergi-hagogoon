"use client";

import React, { useState } from "react";
import { z } from "zod";

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

  const [errors, setErrors] = useState<{ name?: string; stock?: string }>({});

  // Zod schema for validation
  const itemSchema = z.object({
    name: z
      .string()
      .min(1, "Nama barang harus diisi")
      .max(100, "Nama barang maksimal 100 karakter")
      .trim(),
    stock: z
      .string()
      .min(1, "Stok harus diisi")
      .transform((val) => parseInt(val))
      .pipe(z.number().int().min(0, "Stok tidak boleh negatif")),
  });

  const handleAddItem = () => {
    // Clear previous errors
    setErrors({});

    // Validate with Zod
    const result = itemSchema.safeParse({
      name: newItem.name,
      stock: newItem.stock,
    });

    if (!result.success) {
      // Extract and set validation errors
      const fieldErrors: { name?: string; stock?: string } = {};
      result.error.issues.forEach((issue) => {
        const fieldName = issue.path[0] as string;
        fieldErrors[fieldName as keyof typeof fieldErrors] = issue.message;
      });
      setErrors(fieldErrors);
      return;
    }

    // If validation passes, add the item
    onAddItem(result.data.name.trim(), result.data.stock);
    setNewItem({
      name: "",
      stock: "",
    });
    onClose();
  };

  const handleInputChange = (field: "name" | "stock", value: string) => {
    setNewItem({ ...newItem, [field]: value });
    // Clear error for this field when user starts typing
    if (errors[field]) {
      setErrors({ ...errors, [field]: undefined });
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
            onChange={(e) => handleInputChange("name", e.target.value)}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 dark:bg-taupe-900 dark:text-taupe-100 ${
              errors.name
                ? "border-red-500 focus:ring-red-500"
                : "border-taupe-300 dark:border-taupe-600 focus:ring-taupe-500"
            }`}
            placeholder="Masukkan nama barang"
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-500 dark:text-red-400">
              {errors.name}
            </p>
          )}
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-taupe-700 dark:text-taupe-300 mb-2">
            Stok
          </label>
          <input
            type="number"
            value={newItem.stock}
            onChange={(e) => handleInputChange("stock", e.target.value)}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 dark:bg-taupe-900 dark:text-taupe-100 ${
              errors.stock
                ? "border-red-500 focus:ring-red-500"
                : "border-taupe-300 dark:border-taupe-600 focus:ring-taupe-500"
            }`}
            placeholder="Masukkan jumlah stok"
            min="0"
          />
          {errors.stock && (
            <p className="mt-1 text-sm text-red-500 dark:text-red-400">
              {errors.stock}
            </p>
          )}
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
