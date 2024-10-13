import {create} from "zustand";
import { createAuthSlices } from "./slices/auth-slice";


export const useAppStore =  create()((...a) =>({
      ...createAuthSlices(...a),
}));
