"use client";
import React, { useEffect, useState } from "react";
import { useInventoryStore } from "../store/inventoryStore";
import AddItemModal from "../components/AddItemModal";
import InventoryTable from "../components/InventoryTable";

export default function InventoryPage() {
  const { items, addItem, initializeItems } = useInventoryStore();
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // Initialize with localStorage data if exists, otherwise use store default
    const storedItems = localStorage.getItem("inventory-storage");
    if (storedItems) {
      try {
        const parsedData = JSON.parse(storedItems);
        if (parsedData.state?.items) {
          initializeItems(parsedData.state.items);
        }
      } catch (error) {
        console.error("Error parsing localStorage data:", error);
      }
    }
  }, [initializeItems]);

  const handleAddItem = (name: string, stock: number) => {
    addItem({
      name,
      stock,
    });
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="container mx-auto py-10 px-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-taupe-900 dark:text-taupe-100">
          Daftar Barang
        </h1>
        <button
          onClick={openModal}
          className="bg-taupe-600 hover:bg-taupe-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200"
        >
          Tambah Barang
        </button>
      </div>

      <InventoryTable />

      <AddItemModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onAddItem={handleAddItem}
      />
    </div>
  );
}
