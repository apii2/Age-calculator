import { createContext } from "react";
import type DataInterface from "../types/DataInterface";
import { DataToValidate } from "../data/DataToValidate";

export const DateContext = createContext<DataInterface[]>(DataToValidate);