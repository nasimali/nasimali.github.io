export const devLog = (...args: unknown[]) => {
  if (import.meta.env.DEV) {
    console.info('[dev-log]', ...args);
  }
};
