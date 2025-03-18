'use client';

import { create } from 'zustand';

export const useAuthStore = create((set) => ({
  user: null,
  isAuthModalOpen: false,
  openAuthModal: () => set({ isAuthModalOpen: true }),
  closeAuthModal: () => set({ isAuthModalOpen: false }),
  login: (userData) => set({ user: userData, isAuthModalOpen: false }),
  logout: () => set({ user: null }),
}));