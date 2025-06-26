import { createContext } from "react";
import type DataInterface from "../types/DataInterface";


export interface DateContextType {
  validData: DataInterface[];
  isClear: boolean;
}

export const DateContext = createContext<DateContextType|null>(null);