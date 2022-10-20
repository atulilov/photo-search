import styled from "@emotion/styled";

export const Paginator = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 40px;
  button,
  div {
    background-color: #329795;
    color: #fff;
    min-width: 40px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    padding: 4px;
  }
  .active {
    background-color: #40c0be;
    &:disabled {
      cursor: not-allowed;
    }
  }
  div {
    min-width: 40px;
    background-color: #1f5e5d;
    cursor: unset;
    input {
      max-width: 50%;
      background-color: #329795;
      text-align: center;

      &::placeholder {
        color: #fff;
        text-align: center;
      }
    }
  }
  button:last-child {
    border-top-right-radius: 40px;
    border-bottom-right-radius: 40px;
    border-left: 1px solid white;
    padding: 0 20px;
  }
  button:first-of-type {
    border-top-left-radius: 40px;
    border-bottom-left-radius: 40px;
    border-right: 1px solid white;
    padding: 0 20px;
  }
  button:nth-of-type(2) {
    border-right: 1px solid white;
  }
`;
