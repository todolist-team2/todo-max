import { TAction } from "../components/aside/ActionHistoryList";
import { useSetStateStore } from "../hooks/useSetStateStore";
import fetchData from "./fetch";

const updateActions = async () => {
  const setActions = useSetStateStore.use<TAction[]>("actions")[1];

  await fetchData<TAction[]>(
    "/api/actions",
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    },
    setActions
  );
};

export default updateActions;