import type { NextPage } from "next";
import { Container, Heading, VStack } from "@chakra-ui/react";
import Head from "next/head";
import Photo from "~/components/Photo";

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Photo Search</title>
        <meta name="description" content="Search for a photo..." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <VStack>
          <Container maxW="9xl" centerContent mt={10}>
            <Heading as="h1" size="xl">
              Photo Search
            </Heading>
            <Photo />
          </Container>
        </VStack>
      </main>
    </div>
  );
};

export default Home;
