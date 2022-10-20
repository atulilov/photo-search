import { Box } from "@chakra-ui/react";
import styled from "@emotion/styled";

export const StyledBox = styled(Box)`
  overflow: hidden;

  & img {
    transition: transform 0.5s, filter 1.5s ease-in-out;
  }

  & img:hover {
    transform: scale(1.1);
  }

  &.fade-in {
    transform-origin: 0 100%;
    transform: translateY(-5px) rotateX(20deg);
    opacity: 0;
    transition: transform 0.3s ease-in-out, opacity 1s, height 0.5s ease-in-out;
    transition: transform 0.3s ease-in-out, opacity 1s, height 0.5s ease-in-out,
      -webkit-transform 0.3s ease-in-out;
  }

  &.fade-out {
    transform-origin: 0 100%;
    transition: opacity 1s, height 0.5s ease-in-out,
      -webkit-transform 0.3s ease-in-out;
    transition-property: transform, opacity, height, -webkit-transform;
    transition-duration: 0.3s, 1s, 0.5s, 0.3s;
    transition-timing-function: ease-in-out, ease, ease-in-out, ease-in-out;
    transition-delay: 0s, 0s, 0s, 0s;
    -o-transition: transform 0.3s ease-in-out, opacity 1s,
      height 0.5s ease-in-out;
    transform: translateY(0) rotateX(0deg);
    opacity: 1;
  }
`;
