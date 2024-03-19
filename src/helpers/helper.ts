export const toHrsMins = (value: number) => {
  const hours: string | number = Math.floor(value / 60);
  const minutes: string | number = value % 60;
  return { hours, minutes };
};

export const titleToSlug = (value: string) => {
  const newTitle = value?.split(" ").join("-").toLowerCase();
  return newTitle;
};

export const strToNum = (value: string) => {
  return parseInt(value);
};
