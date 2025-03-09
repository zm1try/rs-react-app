import { ThrowErrorButton } from '../ThrowErrorButton/ThrowErrorButton';
import { Pagination } from '../Pagination/Pagination';

export const FooterActions = ({
  isPaginationVisible,
}: {
  isPaginationVisible: boolean;
}) => {
  return (
    <div className="footer-actions">
      {isPaginationVisible && <Pagination />}
      <ThrowErrorButton />
    </div>
  );
};
