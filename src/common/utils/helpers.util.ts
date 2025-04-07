export const joinCacheKey = (...keys: string[]) => {
  return [...keys].filter((key) => !!key).join('_');
};
