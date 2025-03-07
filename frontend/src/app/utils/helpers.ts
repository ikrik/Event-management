export function formatDate(dateString: string): string {
  const date = new Date(dateString);

  const formatter = new Intl.DateTimeFormat('en-US', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });

  const formattedDateTable = formatter.format(date).split(',');
  return `${formattedDateTable[0]}, ${formattedDateTable[1]} ${formattedDateTable[2]}`;
}
