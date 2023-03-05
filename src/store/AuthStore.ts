import { createStore } from 'zustand';

interface AuthStoreType {
  twitterAccountHandle: string;
  derivedAddress: string;
  balance: string;
}

interface AuthStoreActions {
  setTwitterAccountHandle: (handle: string) => void;
  handleTwitterAccountLogout: () => void;
  setAddress: (address: string) => void;
  setBalance: (balance: string) => void;
}

type AuthStore = AuthStoreType & AuthStoreActions;

export const useAuthStore = createStore<AuthStore>((set) => ({
  twitterAccountHandle: '',
  derivedAddress: '',
  balance: '',
  setTwitterAccountHandle: (handle) =>
    set((state) => ({ ...state, twitterAccountHandle: handle })),
  handleTwitterAccountLogout: () =>
    set((state) => ({ ...state, twitterAccountHandle: '' })),
  setAddress: (address) =>
    set((state) => ({ ...state, derivedAddress: address })),
  setBalance: (balance) =>
    set((state) => ({ ...state, balance: balance })),
}));
