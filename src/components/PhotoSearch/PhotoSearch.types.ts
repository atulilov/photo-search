import { PhotoResult } from "pages/api/photo.types";

export interface PhotoSearchProps {
  // eslint-disable-next-line no-unused-vars
  setData: (data: PhotoResult) => void;
  // eslint-disable-next-line no-unused-vars
  setSearchValueResult: (data: string) => void;
  page: number;
  reset: () => void;
}
