// import {create} from "zustand";
// import { createAuthSlices } from "./slices/auth-slice";


// export const useAppStore = create((set) => ({
//   userInfo: {},
//   setUserInfo: (newInfo) => set((state) => ({
//     userInfo: { ...state.userInfo, ...newInfo }
//   })),
// }));





// import {create} from 'zustand';

// export const useAppStore = create((set) => ({
//   userProfileImage: '', // Initially empty or default image URL
//   setUserProfileImage: (image) => set(() => ({ userProfileImage: image })),
// }));




import {create} from 'zustand';

export const useAppStore = create((set) => ({
  userInfo: {
    firstName: '',
    lastName: '',
    profileColor: '',
    image: '', // this will hold the image URL
    profileSetup: false,
  },
  setUserInfo: (userInfo) => set({ userInfo }),
}));








// useAppStore.js
// import { create } from "zustand";

// export const useAppStore = create((set) => ({
//   userInfo: {},
//   setUserInfo: (newInfo) => set((state) => ({
//     userInfo: { ...state.userInfo, ...newInfo },
//   })),
  
//   // Logout functionality
//   logout: () => set({ userInfo: {} }), // Clears userInfo
// }));
// store/index.js

// import { create } from 'zustand';

// export const useAppStore = create((set) => ({
//   userInfo: {
//     name: '',
//     lastName: '',
//     profileImage: '', // URL for the profile image
//   },
//   setUserInfo: (newInfo) => set((state) => ({
//     userInfo: { ...state.userInfo, ...newInfo },
//   })),
// }));


// import create from 'zustand';

// const useAppStore = create((set) => ({
//   userInfo: null,
//   setUserInfo: (data) => set({ userInfo: data }),
//   isAuthenticated: false,
//   setAuthenticated: (status) => set({ isAuthenticated: status }),
// }));
// export default useAppStore ;