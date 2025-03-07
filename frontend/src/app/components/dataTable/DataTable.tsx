import Image from 'next/image';
import { ReactNode } from 'react';

interface DataTableProps<T> {
  data: T[];
  headers: Record<keyof T, string>;
  extraStyles?: Record<keyof T, string>;
  enableHeaders?: boolean;
  iconsPerKey?: Record<keyof T, string>;
}

function DataTable<T extends Record<string, ReactNode> & { id: string }>({
  data = [],
  headers,
  enableHeaders = false,
  extraStyles = {} as Record<keyof T, string>,
  iconsPerKey = {} as Record<keyof T, string>,
}: DataTableProps<T>) {
  const keys = data.length > 0 ? (Object.keys(data[0]).filter((key) => key !== 'id') as string[]) : [];

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left rtl:text-right text-white">
        {enableHeaders && (
          <thead className="text-md text-white uppercase">
            <tr>
              <th scope="col" className="px-2 py-2 max-w-30"></th>
              {keys.map((key) => (
                <th key={key} scope="col" className="px-6 py-3">
                  {headers[key]}
                </th>
              ))}
              <th scope="col" className="px-6 py-3">
                <span className="sr-only">Edit</span>
              </th>
            </tr>
          </thead>
        )}
        <tbody>
          {data?.map((item) => (
            <tr key={item.id} className="border-b border-t border-neutral-700">
              <td className="px-2 py-2"></td>
              {keys.map((key) => (
                <td className={`px-6 py-4 max-w-30 text-lg ${extraStyles[key] || ''}`} key={key}>
                  <div className="flex">
                    {iconsPerKey[key] && (
                      <Image
                        className="mr-2"
                        src={`/images/${iconsPerKey[key]}.svg`}
                        alt={`${iconsPerKey[key]} icon`}
                        width={24}
                        height={24}
                      />
                    )}
                    {item[key]}
                  </div>
                </td>
              ))}
              <td className="px-6 py-4 text-right">
                <a href="#" className="font-medium text-lime-200 hover:underline">
                  Edit
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DataTable;
