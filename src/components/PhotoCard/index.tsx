import { Box, Tag, Flex, Circle, Text } from "@chakra-ui/react";
import Image from "next/image";
import { FC, useEffect, useRef } from "react";
import useIntersect from "~/hooks/useIntersect";
import cn from "classnames";

import { PhotoCardProps } from "./PhotoCard.types";
import { StyledBox } from "./PhotoCard.style";

const ioProps = { rootMargin: "0px", threshold: "0.3" };

const PhotoCard: FC<PhotoCardProps> = ({
  previewURL,
  user,
  userImageURL,
  tags,
  index,
  columns
}) => {
  const [setNode, entry] = useIntersect(ioProps);
  const boxRef = useRef<any>();
  useEffect(() => {
    setNode(boxRef.current);
  }, []);

  const newTags = tags?.split?.(",");
  const newIndex = index + 1;

  const delayNumber =
    100 * (newIndex % columns === 0 ? columns : newIndex % columns);
  return (
    <StyledBox
      p={2}
      shadow="md"
      borderWidth="1px"
      maxWidth="300px"
      minW="220px"
      ref={boxRef}
      className={cn({
        "fade-in": !entry.isIntersecting,
        "fade-out": entry.isIntersecting
      })}
      style={{ transitionDelay: `${delayNumber}ms` }}>
      <Box position="relative" width="100%" height="150px">
        <Image layout="fill" src={previewURL} objectFit="cover" />
      </Box>
      <Flex alignItems="center" justifyContent="space-between" my={2}>
        {user && (
          <Text fontSize="md" mr="5px">
            By {user}
          </Text>
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
    </StyledBox>
  );
};

export default PhotoCard;
