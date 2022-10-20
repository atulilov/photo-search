import {
  BaseSyntheticEvent,
  ChangeEvent,
  FC,
  useEffect,
  useState
} from "react";
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
import { PhotoSearchProps } from "./PhotoSearch.types";

const PhotoSearch: FC<PhotoSearchProps> = ({
  setData,
  setSearchValueResult,
  reset,
  page
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
      `api/photo/?q=${searchValue}&page=${page}&perpage=${50}`
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

  useEffect(() => {
    if (!searchValue?.trim?.()) return;
    getPhotoDataAsync();
  }, [page]);

  const handleSubmit = (e: BaseSyntheticEvent) => {
    e.preventDefault();
    if (!searchValue?.trim?.())
      return setIsInvalidMessage("Please enter some text");

    getPhotoDataAsync();
    reset();
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
