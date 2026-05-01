// src/core/hooks.ts
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "./store";

// Hook typé pour le dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>();
// Hook typé pour le selector
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
