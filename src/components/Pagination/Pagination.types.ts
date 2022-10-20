import { PhotoResult } from "pages/api/photo.types";

export interface PaginationProps {
  page: number;
  // eslint-disable-next-line no-unused-vars
  setPage: (page: number) => void;
  data: PhotoResult;
  goToPage: number | undefined;
  // eslint-disable-next-line no-unused-vars
  setGoToPage: (page: number) => void;
}
