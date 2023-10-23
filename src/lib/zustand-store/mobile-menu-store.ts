import { create } from "zustand"

type ScreenType = "main" | "category" | "search"

type MobileMenuStore = {
  isOpen: boolean
  open: () => void
  close: () => void
  currentScreen: ScreenType
  setCurrentScreen: (newScreen: ScreenType) => void
}

export const useMobileMenuStore = create<MobileMenuStore>((set) => ({
  isOpen: false,
  currentScreen: "main",
  close: () => set((state) => ({ ...state, isOpen: false })),
  open: () => set((state) => ({ ...state, isOpen: true })),
  setCurrentScreen: (newScreen) =>
    set((state) => ({ ...state, currentScreen: newScreen })),
}))
