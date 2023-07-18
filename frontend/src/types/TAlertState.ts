type TAlertState = {
  message: string;
  action: () => Promise<void>;
};

export default TAlertState;
