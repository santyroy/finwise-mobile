import { create } from 'zustand';

type SheetType = 'logoutConfirm' | null;

interface SheetStore {
  sheetType: SheetType;
  isOpen: boolean;
  openSheet: (type: SheetType) => void;
  closeSheet: () => void;
}

export const useBottomSheetStore = create<SheetStore>(set => ({
  sheetType: null,
  isOpen: false,
  openSheet: type => set(() => ({ sheetType: type, isOpen: true })),
  closeSheet: () => set(() => ({ sheetType: null, isOpen: false })),
}));
