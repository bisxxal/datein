import { create } from 'zustand'

type Store = {
  count: number
  inc: () => void
}

const useStore = create<Store>()((set) => ({
  count: 1,
  inc: () => set((state) => ({ count: state.count + 1 })),
}))
 
type UserProfile = {
  name: string
  email: string
  bio?: string
  keywords?: string[]
  // add other fields as needed
}

type State = {
  profile: UserProfile | null
  setProfile: (profile: UserProfile) => void
  clearProfile: () => void
}

export const useUserStore = create<State>((set) => ({
  profile: null,
  setProfile: (profile) => set({ profile }),
  clearProfile: () => set({ profile: null }),
}))
