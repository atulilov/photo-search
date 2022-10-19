import { BaseSyntheticEvent, ChangeEvent, FC, useState } from "react";
import {
  Box,
  Button,
  Center,
  FormControl,
  FormErrorMessage,
  Input
} from "@chakra-ui/react";
import { BeatLoader } from "react-spinners";
import { PhotoResult } from "pages/api/photo.types";

interface PhotoSearchProps {
  // eslint-disable-next-line no-unused-vars
  setData: (data: PhotoResult) => void;
  // eslint-disable-next-line no-unused-vars
  setSearchValueResult: (data: string) => void;
}

const PhotoSearch: FC<PhotoSearchProps> = ({
  setData,
  setSearchValueResult
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const [isInvalidMessage, setIsInvalidMessage] = useState("");

  const handleInputChange = ({
    target: { value }
  }: ChangeEvent<HTMLInputElement>) => setSearchValue(value);

  const getPhotoDataAsync = async () => {
    setIsLoading(true);
    const response: PhotoResult = await fetch(
      `api/photo/?q=${searchValue}&page=${1}&perpage=${100}`
    )
      .then(response => {
        return response.json();
      })
      .then(response => {
        setIsInvalidMessage("");
        return response?.data;
      })
      .catch(error => {
        console.error(error);
        setIsInvalidMessage(error.message);
      });
    setIsLoading(false);
    setData(response);
    setSearchValueResult(searchValue);
  };

  const handleSubmit = (e: BaseSyntheticEvent) => {
    e.preventDefault();
    if (!searchValue?.trim?.())
      return setIsInvalidMessage("Please enter some text");

    getPhotoDataAsync();
  };
  return (
    <form onSubmit={handleSubmit}>
      <Center>
        <Box display="grid" gridGap={2} gridAutoFlow="column" mt={10} maxW="md">
          <FormControl isRequired isInvalid={!!isInvalidMessage}>
            <Input
              value={searchValue}
              placeholder="Search for images"
              onChange={handleInputChange}
            />
            <FormErrorMessage>{isInvalidMessage}</FormErrorMessage>
          </FormControl>
          <Button
            isLoading={isLoading}
            colorScheme="teal"
            spinner={<BeatLoader size={8} color="white" />}
            type="submit">
            Submit
          </Button>
        </Box>
      </Center>
    </form>
  );
};

export default PhotoSearch;
