type StateItem<T> = [T, React.Dispatch<React.SetStateAction<T>>];

export const useSetStateStore = (function () {
  const store: Record<string, StateItem<unknown>> = {};

  return {
    register: <T>(
      name: string,
      value: T,
      setState: React.Dispatch<React.SetStateAction<T>>
    ) => {
      store[name] = [value, setState] as StateItem<unknown>;
    },
    use: <T>(name: string): StateItem<T> => store[name] as StateItem<T>,
  };
})();
