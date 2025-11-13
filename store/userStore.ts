import { create } from 'zustand'
import { User } from '../interfaces/user/user.interface';

export const useUserStore = create((set) => ({
  user: null,
  setUser: (user: User | null) => set({ user }),
  logout: () => set({ user: null })
}))