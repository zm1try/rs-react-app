import type { FC } from 'react';
import { ThrowErrorButton } from '../ThrowErrorButton/ThrowErrorButton';
import { Pagination } from '../Pagination/Pagination';

type FooterActionsProps = {
  isPaginationVisible: boolean;
  currentPage: number;
  onPreviousPage: (num: number) => void;
  onNextPage: (num: number) => void;
};

export const FooterActions: FC<FooterActionsProps> = ({
  isPaginationVisible,
  currentPage,
  onPreviousPage,
  onNextPage,
}) => {
  return (
    <div className={'footer-actions'}>
      {isPaginationVisible && (
        <Pagination
          currentPage={currentPage}
          onPreviousPage={() => onPreviousPage(currentPage - 1)}
          onNextPage={() => onNextPage(currentPage + 1)}
        />
      )}
      <ThrowErrorButton />
    </div>
  );
};
