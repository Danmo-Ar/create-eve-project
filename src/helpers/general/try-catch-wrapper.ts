export const tryCatchWrapper = async (fn: Function) => {
  try {
    await fn();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};
