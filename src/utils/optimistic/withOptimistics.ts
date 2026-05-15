export const withOptimistic = async ({
  dispatch,
  getState,
  optimistic,
  api,
  rollback,
}: {
  dispatch: any;
  getState: any;
  optimistic: () => any;
  api: () => Promise<any>;
  rollback: () => any;
}) => {
  const snapshot = getState();

  dispatch(optimistic());

  try {
    await api();
  } catch (e) {
    dispatch(rollback(snapshot));
  }
};
