import { TAlertState } from "../types/TAlertState";

export const useAlert = (function () {
  const state: {
    set: React.Dispatch<React.SetStateAction<TAlertState | null>> | null;
  } = {
    set: null,
  };

  return {
    register: (
      set: React.Dispatch<React.SetStateAction<TAlertState | null>>
    ) => {
      state.set = set;
    },
    use: (message: string, action: () => void) => {
      if (!state.set) {
        return;
      }
      state.set({ message, action });
    },
  };
})();
