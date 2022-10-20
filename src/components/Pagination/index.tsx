import cn from "classnames";
import { Container } from "@chakra-ui/react";
import { FC, FormEvent, KeyboardEvent } from "react";
import { Paginator } from "./Pagination.style";
import { PaginationProps } from "./Pagination.types";

const Pagination: FC<PaginationProps> = ({
  page,
  setPage,
  data,
  goToPage,
  setGoToPage
}) => {
  const handlePageChange = (index: number) => () => {
    setPage(index);
  };

  const pages = data && data?.totalHits / data?.hits?.length;
  const pagesArray = (pages && Array.from(Array(pages).keys())) || [];
  const newArrayPages = pagesArray?.slice?.(
    page + 2 < pagesArray.length
      ? page - 1
      : page + 2 > pagesArray.length
      ? page - 3
      : page - 2,
    page + 2 < pagesArray.length
      ? page + 1
      : page + 2 > pagesArray.length
      ? page - 1
      : page
  );

  const handleOnChangeGoToPage = (event: FormEvent<HTMLInputElement>) => {
    const element = event.target as HTMLInputElement;
    const { value } = element;
    const parsedValue = Number.parseInt(value);
    if (
      !value ||
      (value.match(/^[0-9\b]+$/) &&
        parsedValue <= pagesArray.length - 1 &&
        parsedValue > 0)
    )
      setGoToPage(parsedValue);
  };

  const handleOnKeyDown = (event: KeyboardEvent<object>) => {
    if (event.key !== "Enter") return;
    const element = event.target as HTMLInputElement;
    const { value } = element;
    const parsedValue = Number.parseInt(value);
    if (!parsedValue || parsedValue === page) return;

    setPage(parsedValue);
  };

  return (
    <Container mt={10} maxW="9xl">
      <Paginator>
        {page > 1 && (
          <button type="button" onClick={() => setPage(page - 1)}>
            Previous
          </button>
        )}
        {newArrayPages.map(p => {
          const index = p + 1;
          const active = page === index;
          return (
            <button
              type="button"
              key={`page-${index}`}
              className={cn({ active })}
              disabled={active}
              onClick={handlePageChange(index)}>
              {index}
            </button>
          );
        })}
        <div>
          <input
            placeholder="?"
            type="number"
            value={goToPage}
            onChange={handleOnChangeGoToPage}
            onKeyPress={handleOnKeyDown}
          />
        </div>
        {pagesArray.length > 2 && (
          <button
            type="button"
            className={cn({ active: page === pagesArray.length - 1 })}
            onClick={() => setPage(pagesArray.length - 1)}>
            {pagesArray.length - 1}
          </button>
        )}
        {page !== pagesArray.length - 1 && (
          <button type="button" onClick={() => setPage(page + 1)}>
            Next
          </button>
        )}
      </Paginator>
    </Container>
  );
};

export default Pagination;
