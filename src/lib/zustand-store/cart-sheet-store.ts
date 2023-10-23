import { create } from "zustand"

type CartSheetStore = {
  isOpen: boolean
  open: () => void
  close: () => void
}

export const useCartSheetStore = create<CartSheetStore>((set) => ({
  isOpen: false,
  close: () => set((state) => ({ ...state, isOpen: false })),
  open: () => set((state) => ({ ...state, isOpen: true })),
}))
