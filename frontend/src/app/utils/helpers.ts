/* eslint-disable @typescript-eslint/no-explicit-any */
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

export function isArrayEqualUnordered<T extends Record<string, any>>(arr1: T[], arr2: T[], key: string) {
  const compareFunctionality = (a: T, b: T) => {
    const valueA = a[key] as number | string;
    const valueB = b[key];

    if (typeof valueA === 'number' && typeof valueB === 'number') {
      return valueA - valueB;
    }

    return String(valueA).localeCompare(String(valueB));
  };

  const sorted1 = [...arr1].sort(compareFunctionality);
  const sorted2 = [...arr2].sort(compareFunctionality);

  return JSON.stringify(sorted1) === JSON.stringify(sorted2);
}

export function convertObjectToURLParams(obj: Record<string, any>) {
  return Object.keys(obj).reduce((acc, key) => {
    if (acc === '') {
      return `${key}=${obj[key]}`;
    }
    return (acc = `${acc}&${key}=${obj[key]}`);
  }, '');
}
