import { FC } from 'react';

interface AutocompleteSuggestionsProps {
  options: string[] | undefined;
  onClick: (location: string) => void;
}

const AutocompleteSuggestions: FC<AutocompleteSuggestionsProps> = ({ options, onClick }) => {
  const handleClick = (location: string) => {
    onClick(location);
  };

  return (
    <div className="absolute top-full left-0 w-full bg-white text-black mt-2 p-2 rounded">
      {options?.map((locations) => (
        <div
          key={locations}
          className="p-2 cursor-pointer hover:bg-gray-300"
          onClick={handleClick.bind(this, locations)}>
          {locations}
        </div>
      ))}
    </div>
  );
};

export default AutocompleteSuggestions;
