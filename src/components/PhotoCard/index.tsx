import {
  Box,
  Tag,
  Flex,
  Circle,
  Text,
  ScaleFade,
  Slide
} from "@chakra-ui/react";
import Image from "next/image";
import { Photo } from "pages/api/photo.types";
import { FC, RefObject, useEffect, useRef } from "react";
import useIntersect from "~/hooks/useIntersect";

const ioProps = { rootMargin: "0px", threshold: "0.3" };

const PhotoCard: FC<Photo> = ({ previewURL, user, userImageURL, tags }) => {
  const [setNode, entry] = useIntersect(ioProps);
  const boxRef = useRef<any>();
  useEffect(() => {
    setNode(boxRef.current);
  }, []);

  const newTags = tags?.split?.(",");

  return (
    <ScaleFade initialScale={0.2} in={entry.isIntersecting}>
      <Box
        p={2}
        shadow="md"
        borderWidth="1px"
        maxWidth="300px"
        minW="220px"
        ref={boxRef}>
        <Box position="relative" width="100%" height="150px">
          <Image layout="fill" src={previewURL} objectFit="cover" />
        </Box>
        <Flex alignItems="center" justifyContent="space-between" my={2}>
          {user && (
            <Flex>
              <Text fontSize="md" maxWidth={20} mr="5px">
                By
              </Text>
              <Text fontSize="md" as="b" maxWidth={20}>
                {user}
              </Text>
            </Flex>
          )}
          <div>
            {userImageURL && (
              <Circle
                size="50px"
                bg="tomato"
                color="red"
                position="relative"
                overflow="hidden">
                <Image src={userImageURL} layout="fill" />
              </Circle>
            )}
          </div>
        </Flex>
        {newTags?.map?.((tag, index) => {
          return (
            <Tag size="md" key={`tag-${index}`} variant="subtle" my="1" mr="1">
              {tag}
            </Tag>
          );
        })}
      </Box>
    </ScaleFade>
  );
};

export default PhotoCard;
