import { FormEvent, KeyboardEvent, useState } from "react";
import Image from "next/image";
import {
  Center,
  Grid,
  GridItem,
  Container,
  Text,
  useBreakpoint
} from "@chakra-ui/react";
import cn from "classnames";

import { PhotoResult } from "pages/api/photo.types";
import PhotoCard from "../PhotoCard";
import PhotoSearch from "../PhotoSearch";
import { Paginator } from "./Photo.style";

const COLUMNS = {
  xl: 4,
  lg: 3,
  md: 2,
  sm: 1
};

type ColumnsKey = keyof typeof COLUMNS;

const GRID_TEMPLATE = {
  xl: `repeat(${COLUMNS.xl}, 1fr)`,
  lg: `repeat(${COLUMNS.lg}, 1fr)`,
  md: `repeat(${COLUMNS.md}, 1fr)`,
  sm: `repeat(${COLUMNS.sm}, 1fr)`
};

export default function Photo() {
  const [data, setData] = useState<PhotoResult>();
  const [page, setPage] = useState<number>(1);
  const [goToPage, setGoToPage] = useState<number | undefined>();
  const [searchValueResult, setSearchValueResult] = useState("");
  const breakpoint = useBreakpoint();
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
    <>
      <PhotoSearch
        page={page}
        setData={setData}
        setSearchValueResult={setSearchValueResult}
      />
      {!!data?.hits?.length && (
        <Center>
          <Container mt={10} maxW="9xl">
            <Center>
              <Text fontSize="md">
                Showing <u>{data.hits.length}</u> of <u>{data.totalHits}</u>
                &nbsp; results for <u>{searchValueResult}</u>
              </Text>
            </Center>
            <Grid templateColumns={GRID_TEMPLATE} gap={6} my={10}>
              {data?.hits.map((photo, index) => {
                const { id } = photo;
                return (
                  <GridItem key={id}>
                    <PhotoCard
                      {...photo}
                      index={index}
                      columns={COLUMNS[breakpoint as ColumnsKey] || COLUMNS.xl}
                    />
                  </GridItem>
                );
              })}
            </Grid>
            {pages && pages > 1 && (
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
            )}
          </Container>
        </Center>
      )}
      {!data?.hits?.length && !!searchValueResult && (
        <Image
          src="https://cdn.dribbble.com/users/2382015/screenshots/6065978/media/8b4662f8023e4e2295f865106b5d3aa7.gif"
          width="800"
          height="600"
        />
      )}
    </>
  );
}
