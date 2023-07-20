import { TAction } from "../components/aside/ActionHistoryList";
import { useSetStateStore } from "../hooks/useSetStateStore";
import fetchData from "./fetch";

const deleteActions = () => {
  (async () => {
    const setActions = useSetStateStore.use<TAction[]>("actions")[1];
    await fetchData<TAction[]>(
      "/api/actions",
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      },
      setActions
    );
  })();
};

export default deleteActions;
