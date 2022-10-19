import {
  Center,
  Grid,
  GridItem,
  Container,
  Text,
  Spacer
} from "@chakra-ui/react";

import {
  Previous,
  Paginator,
  PageGroup,
  Page,
  Next,
  generatePages
} from "chakra-paginator";

import React, { useState } from "react";
import { PhotoResult } from "pages/api/photo.types";
import PhotoCard from "../PhotoCard";
import PhotoSearch from "../PhotoSearch";
import Image from "next/image";

export default function Photo() {
  const [data, setData] = useState<PhotoResult>();
  const [searchValueResult, setSearchValueResult] = useState("");

  const handlePageChange = () => {};

  return (
    <>
      <PhotoSearch
        setData={setData}
        setSearchValueResult={setSearchValueResult}
      />
      {!!data?.hits?.length && (
        <Center>
          <Container mt={10} width="9xl">
            <Center>
              <Text fontSize="md">
                Showing <Text as="u">{data.hits.length}</Text> of{" "}
                <Text as="u">{data.totalHits}</Text> results for{" "}
                <Text as="u">{searchValueResult}</Text>
              </Text>
            </Center>
            <Grid templateColumns="repeat(3, 1fr)" gap={6} mt={10}>
              {data?.hits.map(photo => {
                const { id } = photo;
                return (
                  <GridItem w="100%" key={id}>
                    <PhotoCard {...photo} />
                  </GridItem>
                );
              })}
            </Grid>
            <Spacer />
            <Paginator onPageChange={handlePageChange} pagesQuantity={4}>
              <Previous bg="white">&lt;</Previous>
              <PageGroup>
                {generatePages(4)?.map(page => (
                  <Page
                    key={`paginator_page_${page}`}
                    page={page}
                    normalStyles={normalStyles}
                    activeStyles={activeStyles}
                  />
                ))}
              </PageGroup>
              <Next bg="white">&gt;</Next>
            </Paginator>
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

const normalStyles = {
  bg: "white"
};

const activeStyles = {
  bg: "blue.300"
};
