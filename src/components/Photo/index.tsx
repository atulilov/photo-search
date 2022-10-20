import { useState } from "react";
import Image from "next/image";
import {
  Center,
  Grid,
  GridItem,
  Container,
  Text,
  useBreakpoint
} from "@chakra-ui/react";

import { PhotoResult } from "pages/api/photo.types";
import PhotoCard from "../PhotoCard";
import PhotoSearch from "../PhotoSearch";
import Pagination from "../Pagination";

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
  const [goToPage, setGoToPage] = useState<number | undefined | null>();
  const [searchValueResult, setSearchValueResult] = useState("");
  const breakpoint = useBreakpoint();
  const pages = data && data?.totalHits / data?.hits?.length;

  const handleReset = () => {
    setPage(1);
    setGoToPage(1);
  };

  return (
    <>
      <PhotoSearch
        page={page}
        setData={setData}
        setSearchValueResult={setSearchValueResult}
        reset={handleReset}
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
              <Pagination
                page={page}
                setPage={setPage}
                data={data}
                goToPage={goToPage}
                setGoToPage={setGoToPage}
              />
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
