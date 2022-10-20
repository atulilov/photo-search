import { Photo } from "pages/api/photo.types";

export interface PhotoCardProps extends Photo {
  index: number;
  columns: number;
}
