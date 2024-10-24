




import {create} from 'zustand';

export const useAppStore = create((set) => ({
  userInfo: {
    firstName: '',
    lastName: '',
    profileColor: '',
    image: '',
    profileSetup: false,
  },
  setUserInfo: (userInfo) => set({ userInfo }),
}));





