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

  // Pagination
  currentPage: number;
  itemsPerPage: number;
  setCurrentPage: (page: number) => void;
  setItemsPerPage: (itemsPerPage: number) => void;

  // Search
  searchTerm: string;
  setSearchTerm: (term: string) => void;

  // Sorting
  sortField: keyof Item;
  sortDirection: "asc" | "desc";
  setSortField: (field: keyof Item) => void;
  setSortDirection: (direction: "asc" | "desc") => void;
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

      // Pagination state
      currentPage: 1,
      itemsPerPage: 10,

      // Search state
      searchTerm: "",

      // Sorting state
      sortField: "name",
      sortDirection: "asc",

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

      // Pagination actions
      setCurrentPage: (page) => set({ currentPage: page }),
      setItemsPerPage: (itemsPerPage) => set({ itemsPerPage, currentPage: 1 }),

      // Search actions
      setSearchTerm: (term) => set({ searchTerm: term, currentPage: 1 }),

      // Sorting actions
      setSortField: (field) => {
        const currentField = get().sortField;
        const currentDirection = get().sortDirection;

        if (currentField === field) {
          // Toggle direction if same field
          set({
            sortDirection: currentDirection === "asc" ? "desc" : "asc",
            currentPage: 1,
          });
        } else {
          // Set new field and default to asc
          set({
            sortField: field,
            sortDirection: "asc",
            currentPage: 1,
          });
        }
      },

      setSortDirection: (direction) =>
        set({ sortDirection: direction, currentPage: 1 }),
    }),
    {
      name: "inventory-storage",
      partialize: (state) => ({
        items: state.items,
        currentPage: state.currentPage,
        itemsPerPage: state.itemsPerPage,
        searchTerm: state.searchTerm,
        sortField: state.sortField,
        sortDirection: state.sortDirection,
      }),
    },
  ),
);

// Computed values
export const useComputedInventory = () => {
  const {
    items,
    currentPage,
    itemsPerPage,
    searchTerm,
    sortField,
    sortDirection,
  } = useInventoryStore();

  // Filter items based on search term
  const filteredItems = items.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  // Sort filtered items
  const sortedItems = [...filteredItems].sort((a, b) => {
    const aValue = a[sortField];
    const bValue = b[sortField];

    if (typeof aValue === "string" && typeof bValue === "string") {
      const comparison = aValue.localeCompare(bValue);
      return sortDirection === "asc" ? comparison : -comparison;
    }

    if (typeof aValue === "number" && typeof bValue === "number") {
      const comparison = aValue - bValue;
      return sortDirection === "asc" ? comparison : -comparison;
    }

    return 0;
  });

  // Calculate pagination
  const totalPages = Math.ceil(sortedItems.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedItems = sortedItems.slice(startIndex, endIndex);

  return {
    filteredAndSortedItems: paginatedItems,
    totalPages,
    totalItems: filteredItems.length,
    startIndex,
    endIndex,
  };
};
