export function convertToDaysSince(createdAt: string): string {
  const createdAtDate = new Date(createdAt);

  const currentDate = new Date();

  const millisecondsDiff = currentDate.getTime() - createdAtDate.getTime();

  const daysDiff = millisecondsDiff / (24 * 60 * 60 * 1000);

  const roundedDaysDiff = Math.floor(daysDiff);

  return `${roundedDaysDiff} hari`;
}
