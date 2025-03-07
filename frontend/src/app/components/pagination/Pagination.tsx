import NextIcon from '@images/next';
import PreviousIcon from '@images/previous';
import { Pagination as IPagination } from 'types/events.types';

const COMMON_CLASSES = 'flex items-center justify-center px-4 h-10 text-base font-medium';

interface PaginationProps extends Required<IPagination> {
  onMoveToPage: (page: number) => void;
}

const Pagination = ({ page, pageSize, total, onMoveToPage }: PaginationProps) => {
  const actualPage = page * pageSize;
  const pageFirstItem = page === 1 ? 1 : (page - 1) * pageSize + 1;

  const handleNext = () => {
    if (actualPage >= total) return;
    onMoveToPage(page + 1);
  };

  const handlePrevious = () => {
    if (page === 1) return;
    onMoveToPage(page - 1);
  };

  return (
    <div className="mt-10 flex flex-col items-start">
      <span className="text-sm text-neutral-400 text-center">
        <span className="font-semibold text-white">{pageFirstItem}</span> to{' '}
        <span className="font-semibold text-white">{actualPage > total ? total : actualPage}</span> of{' '}
        <span className="font-semibold text-white">{total}</span> Entries
      </span>
      <div className="inline-flex mt-2 xs:mt-0">
        <button
          onClick={handlePrevious}
          className={`${COMMON_CLASSES} text-neutral-400 bg-neutral-800 rounded-s hover:bg-neutral-900 border-neutral-700 hover:bg-neutral-700 hover:text-white`}>
          <PreviousIcon /> Prev
        </button>
        <button
          onClick={handleNext}
          className={`${COMMON_CLASSES} text-neutral-400 bg-neutral-800 border-0 border-s rounded-e hover:bg-neutral-900 border-neutral-700 hover:bg-neutral-700 hover:text-white`}>
          Next <NextIcon />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
