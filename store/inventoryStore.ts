import { create } from "zustand";
import { persist } from "zustand/middleware";

interface Item {
  id: number;
  name: string;
  stock: number;
  createdAt: string;
  lastUpdate: string;
}

interface InventoryStore {
  items: Item[];
  addItem: (item: Omit<Item, "id" | "createdAt" | "lastUpdate">) => void;
  updateStock: (id: number, quantity: number) => void;
  increaseStock: (id: number, amount: number) => void;
  decreaseStock: (id: number, amount: number) => void;
  initializeItems: (items: Item[]) => void;
}

const mockItems: Item[] = [
  {
    id: 1,
    name: "Laptop Dell XPS 13",
    stock: 15,
    createdAt: "2023-10-25",
    lastUpdate: "2023-10-25",
  },
  {
    id: 2,
    name: 'Monitor LG 24"',
    stock: 8,
    createdAt: "2023-10-26",
    lastUpdate: "2023-10-26",
  },
  {
    id: 3,
    name: "Keyboard Mechanical Keychron",
    stock: 25,
    createdAt: "2023-10-24",
    lastUpdate: "2023-10-24",
  },
  {
    id: 4,
    name: "Mouse Logitech MX Master 3",
    stock: 12,
    createdAt: "2023-10-27",
    lastUpdate: "2023-10-27",
  },
];

export const useInventoryStore = create<InventoryStore>()(
  persist(
    (set, get) => ({
      items: mockItems,

      initializeItems: (items) => {
        set({ items });
      },

      addItem: (item) => {
        const currentDate = new Date().toISOString().split("T")[0];
        const newId = Math.max(...get().items.map((i) => i.id), 0) + 1;
        set((state) => ({
          items: [
            ...state.items,
            {
              ...item,
              id: newId,
              createdAt: currentDate,
              lastUpdate: currentDate,
            },
          ],
        }));
      },

      updateStock: (id, quantity) => {
        set((state) => ({
          items: state.items.map((item) =>
            item.id === id
              ? {
                  ...item,
                  stock: Math.max(0, item.stock + quantity),
                  lastUpdate: new Date().toISOString().split("T")[0],
                }
              : item,
          ),
        }));
      },

      increaseStock: (id, amount) => {
        get().updateStock(id, Math.abs(amount));
      },

      decreaseStock: (id, amount) => {
        get().updateStock(id, -Math.abs(amount));
      },
    }),
    {
      name: "inventory-storage",
    },
  ),
);
