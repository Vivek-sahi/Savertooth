"use client";

import {
  createContext,
  useContext,
  useReducer,
  ReactNode,
  Dispatch,
} from "react";
import { WizardState, UserSelection, SavingsResult } from "@/data/types";

type WizardAction =
  | { type: "SET_STEP"; step: number }
  | { type: "SET_SUBSCRIPTIONS"; selections: UserSelection[] }
  | { type: "SET_SERVICES"; selections: UserSelection[] }
  | { type: "ADD_SUBSCRIPTION"; selection: UserSelection }
  | { type: "REMOVE_SUBSCRIPTION"; itemId: string }
  | { type: "ADD_SERVICE"; selection: UserSelection }
  | { type: "REMOVE_SERVICE"; itemId: string }
  | { type: "SET_RESULTS"; results: SavingsResult }
  | { type: "RESET" };

const initialState: WizardState = {
  step: 1,
  selectedSubscriptions: [],
  selectedServices: [],
  results: null,
};

function wizardReducer(state: WizardState, action: WizardAction): WizardState {
  switch (action.type) {
    case "SET_STEP":
      return { ...state, step: action.step };
    case "SET_SUBSCRIPTIONS":
      return { ...state, selectedSubscriptions: action.selections };
    case "SET_SERVICES":
      return { ...state, selectedServices: action.selections };
    case "ADD_SUBSCRIPTION": {
      const filtered = state.selectedSubscriptions.filter(
        (s) => s.itemId !== action.selection.itemId
      );
      return {
        ...state,
        selectedSubscriptions: [...filtered, action.selection],
      };
    }
    case "REMOVE_SUBSCRIPTION":
      return {
        ...state,
        selectedSubscriptions: state.selectedSubscriptions.filter(
          (s) => s.itemId !== action.itemId
        ),
      };
    case "ADD_SERVICE": {
      const filtered = state.selectedServices.filter(
        (s) => s.itemId !== action.selection.itemId
      );
      return { ...state, selectedServices: [...filtered, action.selection] };
    }
    case "REMOVE_SERVICE":
      return {
        ...state,
        selectedServices: state.selectedServices.filter(
          (s) => s.itemId !== action.itemId
        ),
      };
    case "SET_RESULTS":
      return { ...state, results: action.results };
    case "RESET":
      return initialState;
    default:
      return state;
  }
}

const WizardContext = createContext<{
  state: WizardState;
  dispatch: Dispatch<WizardAction>;
}>({ state: initialState, dispatch: () => {} });

export function WizardProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(wizardReducer, initialState);
  return (
    <WizardContext.Provider value={{ state, dispatch }}>
      {children}
    </WizardContext.Provider>
  );
}

export function useWizard() {
  return useContext(WizardContext);
}
