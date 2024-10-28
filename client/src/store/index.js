




// import {create} from 'zustand';

// export const useAppStore = create((set) => ({
//   userInfo: {
//     firstName: '',
//     lastName: '',
//     profileColor: '',
//     image: '',
//     profileSetup: false,
//   },
//   setUserInfo: (userInfo) => set({ userInfo }),
// }));
// import {create} from "zustand";
// import {createAuthSlices} from "./slices/auth-slice"
// import { createChatSlice } from "./slices/chat-slice";


// export const useAppStore = create()((...a)=>({
//   ...createAuthSlices(...a),
//   ...createChatSlice(...a),
// }))


// store.js or equivalent file
import { create } from 'zustand';
import { createAuthSlices } from './slices/auth-slice';
import { createChatSlice } from './slices/chat-slice';

export const useAppStore = create((...a) => ({
  ...createAuthSlices(...a),
  ...createChatSlice(...a),
}));
